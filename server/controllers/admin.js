var mongoose = require('mongoose');
var User = mongoose.model('users');
var Class = mongoose.model('classes');
var passport = require('passport');
//var bCrypt = require('bcrypt-nodejs');
var bcrypt = require('bcryptjs');

var secretPassword = function(password){
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);
}

var isvalidPassword = function(userPassword, databasePassword){
    return bcrypt.compareSync(userPassword, databasePassword);
}

module.exports = (function() {
	return {
		getClasses: function(req, res){
			Class.find({}).populate('_users').exec(function(err, classes){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					res.json(classes);
				}
			})
		},

		deleteClass: function(req, res){
			Class.find({_id: req.params.id}).remove().exec(function(err, deletedClass){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					res.json("class deleted");
				}
			})
		},

		getClassToRemoveUser: function(req, res){
			Class.find({_id: req.params.class_id}).populate('_users').exec(function(err, classes){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					res.json(classes);
				}
			})
		},

		deleteRelationshipUserAndClass: function(req, res){
			console.log("getClassToRemoveUser", req.body);
			Class.find({_id: req.body.class}, function(err, found_class){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					console.log("**********found class***********", found_class[0]);
					for(var i=0; i < found_class[0]._users.length; i++){
						if(found_class[0]._users[i] == req.body.user){
							 found_class[0]._users[i] = found_class[0]._users[found_class[0]._users.length-1];
							 found_class[0]._users.pop();
						}
					}
					found_class[0].save();
				}
			});
			User.find({_id: req.body.user}, function(err, found_user){
				if(err){
					console.log(err);
				}
				else{
					found_user[0]._class = "";
					found_user[0].save();
				}
				res.json(found_user);
			});

		},

		searchForUser: function(req, res){
			console.log("searchForUser: ", req.body);
			User.find({first_name: req.body.firstName, last_name: req.body.lastName}, function(err, users){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					console.log("Here are the users: ", users);
					res.json(users);
				}
			})
		},

		addUserToClass: function(req, res){
			console.log("addUserToClass: ", req.body);
			User.findOne({_id: req.body.user_id}, function(err, user){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					user._class= req.body.class_id;
					user.save();
					// console.log("Here are the users: ", user);
				}
			})
			Class.findOne({_id: req.body.class_id}, function(err, foundClass){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					foundClass._users.push(req.body.user_id);
					foundClass.save();
					// console.log("Here are the users: ", user);
					res.json(foundClass);
				}
			})
		},

		blockUser: function(req, res){
			console.log("req.body on blockUser: ", req.body);
			User.findOne({_id: req.body.user_id}, function(err, user){
				if(err){
					console.log(err);
					// console.log('getmongooses function mongooses controller');
				} else {
					user.blocked = !user.blocked;
					// if(user.blocked == true){
					// 	user.blocked = false;
					// }
					// if(user.blocked == true){
					// 	user.blocked = false;
					// }
					user.save();
					res.json(user);
				}
			})
		},

	}
})();