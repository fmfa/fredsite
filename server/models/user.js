var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
// var bcrypt = require('bcrypt');
// var password = require('password-hash-and-salt');

var UserSchema = new mongoose.Schema({
    first_name: {
      type:  String,
      required : true,
      maxlength : 255,
      
    },
    last_name : {
      type : String,
      required : true,
      maxlength : 255,
      
    },
    email : {
     type : String,
     required : true,
     maxlength : 255,
     
   },
   email_share : {
    type : Boolean
  },
    password : {
      type :  String,
      required : true,

    },
    phone : {
      type : Number,
      sparse:true
      // required : true,
    },
    phone_share : {
     type : Boolean
   },
    profile_pic : {
      type : String,
      sparse:true
      // required : true
    },

    user_level : {
      type : Number,
      default: 1,
    },
    resetPasswordExpires: Date,
    resetPasswordToken: String,
    blocked: {
      type: Boolean,
      default: false
    },

    _post_id: [{
      type: Schema.Types.ObjectId,
      ref: 'posts'
    }],
    _comment_id: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }],
    _class: {
      type: Schema.Types.ObjectId, 
      ref: 'classes'
    },
    _following: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: {unique: true}
    }],
  },
    {timestamps: true}
);

// the following codes are for passport
// they need to be above mongoose.model('users', UserSchema);
UserSchema.plugin(passportLocalMongoose);



//bcrype method
// take a user's password and add salt to it
// UserSchema.methods.generateHash = function (password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
// };
// UserSchema.methods.validPassword = function(password){
//   return bcrypt.compareSync(password, this.password);
// };


module.exports = mongoose.model('users', UserSchema);
mongoose.model('users', UserSchema);
// Validations
// UserSchema.path('first_name').required(true, 'First name cannot be blank');
// UserSchema.path('last_name').required(true, 'Last name cannot be blank');
// UserSchema.path('email').required(true, 'Email cannot be blank');
// UserSchema.path('password').req
