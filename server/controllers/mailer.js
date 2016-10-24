var mongoose = require('mongoose');
var secret = require('./app.js');
var crypto = require('crypto');
var async = require('async');
var User = mongoose.model('users');
var bcrypt = require('bcryptjs');
var secretPassword = function(password){
    var salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt);
}
// nodemailer setup
var nodemailer = require('nodemailer'); 

var smtpConfig ={
  service: "Gmail",
  host: 'smtp.gmail.com', 
  port: 465, 
  secure: true, 
  auth: {
    user: secret.email, 
    pass: secret.password 
  }, 
  tls:{
    secureProtocol: "TLSv1_method"
  }
};

var transporter = nodemailer.createTransport(smtpConfig);


module.exports = (function() {
  return {
    registration: function(req, res){

      console.log(req.body);
      var mailOptions = {
          from: 'FMFA@fmfa.org', 
          to: req.body.email, // list of receivers 
          subject: 'Welcome to FMFA Inc.', // Subject line 
          text: 'Hello there, \n \n Welcome to FMFA Inc. Please register for the website at locahost:8000/register \n \nThanks, \n Fred Fowler'
        
      };
    console.log('this is the mail options', mailOptions); 

    transporter.sendMail(mailOptions, function(error, info){
        console.log('inside the transporter')
        if(error){
            return console.log('this is the ', error);
        }
        console.log('Message sent: ' + info.response);
    });
    }, 

    forgotEmail: function(req, res){
      // crypto.randomBytes(20, function(err, buf) {
      //   var token = buf.toString('hex');
      // });
      // var mailOptions = {
      //     from: 'FMFA@fmfa.org', 
      //     to: req.body.email, // list of receivers 
      //     subject: 'FMFA Inc. Password Reset', // Subject line 
      //     text:'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n Please click on the following link, or paste this into your browser to complete the process: \n localhost:8000/#/reset/'+token+'\n If you did request this, please ignore this email and your password will remain unchanged.'        
      // };
      // console.log('this is the mail options', mailOptions); 

      // transporter.sendMail(mailOptions, function(error, info){
      //     if(error){
      //         return console.log('this is the ', error);
      //     }
      //     console.log('Message sent: ' + info.response);
      // });
      crypto.randomBytes(8, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token);
        User.findOne({email:req.body.email}, function(err, user){
            if (err) {
                console.log(err);
            } else {
                user.password = secretPassword(token);
                user.save(function(err){
                  if(err){
                    console.log('there was an error with pw reset')
                    
                  }
                  res.json(user);
                });
            }
        });
        var mailOptions = {
          from: 'FMFA@fmfa.org', 
          to: req.body.email, // list of receivers 
          subject: 'FMFA Inc. Password Reset', // Subject line 
          text:'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n We have reset your password to ' + token + '. Please use this password to login and subsequently change your password'        
        };
        console.log('this is the mail options', mailOptions); 

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log('this is the ', error);
            }
            console.log('Message sent: ' + info.response);
        });
      });
      
    }
  }
})();


