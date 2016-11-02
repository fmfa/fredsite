var mongoose = require('mongoose');
var User = mongoose.model('users');
var Class = mongoose.model('classes');
var passport = require('passport');
var bcrypt = require('bcryptjs');

var secretPassword = function(password){
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);
}

var isvalidPassword = function(userPassword, databasePassword){
    return bcrypt.compareSync(userPassword, databasePassword);
}


module.exports = (function (){
  return {
    createUser: function (req, res){
      // console.log("*@*@* Back-end controller -- users.js -- createUser ***");
      // console.log('*@*@* req.body', req.body);
      // console.log("password : secretPassword(req.body.password)",  secretPassword(req.body.password));

      User.findOne({email: req.body.email}, function (err, foundUser){
        if(foundUser){
          res.send({status:500, message: 'Sorry, the email has been used. Please use another email!', type:'internal'});
        }
        else{
          var user = new User({
            first_name: req.body.firstName,
            last_name : req.body.lastName,
            email : req.body.email,
            password : secretPassword(req.body.password)
          });

          user.save(function (err){
            if(err){
              console.log('*@*@* error ', err);
            }
            else {
                  // console.log('save this user information', user);
                  // req.session.userFirstName = user.first_name;
                  // req.session.userLastName = user.last_name;
                  // req.session.userId = user._id;
                  // req.session.userEmail = user.email;
                  // console.log('req.session', req.session);
                  res.send({status:201, userCookie: user, isLoggedIn: true, authentication: true, type:'internal'});
            }
          });
        }
      });

    },
    updateUser: function (req, res){
      // console.log("*@*@* Back-end controller -- users.js -- userInformation ***");
      // console.log('req.body: ',req.body);
      // replace session.userId with cookieId
      User.findOne({_id:req.body.user_id}, function(err, user) {
                if (err) {
                    console.log(err);
                } else {
                    user.first_name = req.body.first_name;
                    user.last_name = req.body.last_name;
                    user.email = req.body.email;
                    user.phone = req.body.phone;
                    user.email_share = req.body.emailShare;
                    user.phone_share = req.body.phoneShare;
                    user.save(function(err){
                        res.json(user);
                    });
                }
            });
    },
    followUser: function (req, res){
      console.log('req.body: ',req.body);
      User.findOne({_id:req.body.follower}, function(err, user) {
                if (err) {
                    console.log('ERROR FINDING USER',err);
                } 
                else {
                    user._following.push(req.body.following) 
                    user.save(function(erro){
                      if(erro){
                        console.log('ERROR FOLLOWING', erro)
                        res.json({error: erro});
                      }
                      else{
                        console.log('success following', user)
                        res.json(user);
                      }
                    });
                }
            });
    },
    unfollowUser: function (req, res){
      console.log('req.body: ',req.body);
      User.findOne({_id:req.body.follower}, function(err, user) {
                if (err) {
                    console.log('ERROR FINDING USER',err);
                } 
                else {
                    console.log('BEFORE SPLICE:', user)
                    var index = user._following.indexOf(req.body.following);
                    user._following.splice(index, 1); 
                    console.log('AFTER SPLICE:', user)
                    user.save(function(erro){
                      if(erro){
                        console.log('ERROR FOLLOWING', erro)
                        res.json({error: erro});
                      }
                      else{
                        console.log('success UNfollowing', user)
                        res.json(user);
                      }
                    });
                }
            });
    },
    updatePassword: function (req, res){
      // console.log('req.body: ',req.body);
      User.findOne({_id:req.body.userId}, function(err, user) {
          if (err) {
              console.log(err);
          } else {

              if(isvalidPassword(req.body.old, user.password) ){
                  user.password = secretPassword(req.body.new);
                  user.save(function (err, result){
                    if (err) {
                      console.log('error updating password', err)
                    }
                    else{
                      console.log('success updating password', result)
                      res.json({status: 'ok!'})
                    }
                  });
              }
              else{
                res.json({status: 'Incorrect old password'});
              }
          }
      });
    },
    userInformation: function (req, res){
      console.log("*@*@* Back-end controller -- users.js -- userInformation ***");
      console.log('req.session: ',req.session);
      User.find({_id:req.session.userId}, function(err, users) {
                if (err) {
                    console.log(err);
                } else {
                    res.json(users);
                }
            });
    },
    // login: function (req, res){
    //   // console.log("*@*@* Back-end controller -- users.js -- logIn ***");
    //   User.findOne({email: req.body.email}, function (err, user){
    //     var verifyPassword = req.body.password;
    //     if(!user){
    //       console.log(err);
    //       res.send({status:500, message: 'Sorry, the user account does not exist. Please check again!', type:'internal'});
    //     }
    //     else if(!isvalidPassword(req.body.password, user.password) ){
    //       console.log(err);
    //       // err = "Incorrect password. Please check again!";
    //       res.send({status:500, message: 'Invailid password. Please check again!', type:'internal'});
    //       // res.json(err);
    //     }
    //     else{

    //         if(isvalidPassword(req.body.password, user.password)){
    //               console.log("user", user);
    //       //   // eddys work
    //       // if(req.body.password === user.password){
    //             // req.session.userFirstName = user.first_name;
    //             // req.session.userLastName = user.last_name;
    //             // req.session.userId = user._id;
    //             // req.session.userEmail = user.email;
    //             res.send({status:200, userCookie: user, authentication: true, type:'internal'});
    //       }
    //     }
    //   });
    // },
    login: function (req, res){
      console.log("*@*@* Back-end controller -- users.js -- logIn ***");
      User.findOne({email: req.body.email})
      .populate('_class')
      .exec(function (err, user){
        var verifyPassword = req.body.password;
        if(!user){
          console.log(err);
          res.send({status:500, message: 'Sorry, the user account does not exist. Please check again!', type:'internal'});
        }
        else if(!isvalidPassword(req.body.password, user.password) ){
          console.log(err);
          res.send({status:500, message: 'Invailid password. Please check again!', type:'internal'});
        }
        else if(user.blocked){
          res.send({status:500, message: 'Account restricted. Please contact administrator.', type:'internal'});
        }
        else{

            if(isvalidPassword(req.body.password, user.password)){
                  console.log("user", user);
          //   // eddys work
          // if(req.body.password === user.password){
                // req.session.userFirstName = user.first_name;
                // req.session.userLastName = user.last_name;
                // req.session.userId = user._id;
                // req.session.userEmail = user.email;
                res.send({status:200, userCookie: user, authentication: true, type:'internal'});
          }
        }
      });
    },
    logout: function (req, res){
      // console.log("*@*@* Back-end controller -- users.js -- logout ***");
      // console.log('*@*@* destroy the following session data \n', req.session);
      // req.session.destroy();
      // console.log('session data destroied -- session data: ', req.session);
      res.redirect('/');
    },
    searchName: function (req,res) {
      // console.log("*@*@* Back-end controller -- users.js -- searchName ***");
        // original query

      // User.find({'first_name': {'$regex': req.body.name}}, function(err, users) {
      //           if (err) {
      //               console.log(err);
      //           } else {
      //               res.json(users);
      //           }
      //       });

      //updated query by Andrew 9/19
      User.find({$or: [
                {"first_name": new RegExp(req.body.name, "i")},
                {"last_name": new RegExp(req.body.name, "i")}
            ]}, function(err, users) {
                if (err){
                    console.log(err);
                } else {
                    res.json(users);
                }
            }); 
    },
    getUsers: function(req, res){
      // console.log('GOT TO GET USERS CONTROLLER');
      User.find({}).populate('_class').exec(function(err, users){
        if(err){
          console.log(err);
        }else{
          res.json(users);
        }
      })
    },
    getProjects: function(req, res){
      // console.log('GOT TO GET USERS CONTROLLER');
      Class.find({open: true}, function(err, found_classes){
        if(err){
          console.log(err);
        }else{
          res.json(found_classes);
        }
      })
    },
    destroyUser: function(req,res) {
      User.findByIdAndRemove(req.params.id, function(err){
        if(err){
          console.log('error deleting user:', err);
        }
        else{
          res.json({status: 'ok'})
        }
      })
    },

    uploadUrl: function(req, res){
      // console.log(req.params.id); 
      // console.log(req.body)
      User.findByIdAndUpdate({_id: req.params.id}, { profile_pic: req.body.image}, {new: true}, function(err, updatedUser){
        if(err){
          console.log('error', err);
        }
        else{
          console.log('success, this is the updated user: ', updatedUser); 
          res.json(updatedUser);
        }
      })
    },  
    admin_login: function (req, res){
      // console.log("*@*@* Back-end controller -- users.js -- logIn ***");
      User.findOne({email: req.body.email}, function (err, user){
        var verifyPassword = req.body.password;
        if(!user){
          console.log(err);
          res.send({status:500, message: 'Sorry, the user account does not exist. Please check again!', type:'internal'});
        }
        else if(!isvalidPassword(req.body.password, user.password) ){
          console.log(err);
          // err = "Incorrect password. Please check again!";
          res.send({status:500, message: 'Invailid password. Please check again!', type:'internal'});
          // res.json(err);
        }
        else if(user.user_level != 9){
          console.log(err);
          // err = "Not Authorized as an Admin!";
          res.send({status:500, message: 'Not Authorized as an Admin!', type:'internal'});
          // res.json(err);
        }
        else{

            if(isvalidPassword(req.body.password, user.password)){
                  console.log("user", user);
          //   // eddys work
          // if(req.body.password === user.password){
                // req.session.userFirstName = user.first_name;
                // req.session.userLastName = user.last_name;
                // req.session.userId = user._id;
                // req.session.userEmail = user.email;
                res.send({status:200, userCookie: user, authentication: true, type:'internal'});
          }
        }
      });
    },
    createClass: function (req, res){
      // console.log(req.body, '*******************REQ BODY***************************')
      var newClass = new Class(req.body);
      newClass.save(function (err, result){
        if(err){
          console.log('*@*@* error creating class ', err);
        }
        else {
            console.log('this is our new class',result);
            res.json(result);
        }
      });
    },



  };
})();
