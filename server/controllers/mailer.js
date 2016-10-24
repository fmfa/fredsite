var secret = require('./app.js')
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
      var mailOptions = {
          from: 'FMFA@fmfa.org', 
          to: req.body.email, // list of receivers 
          subject: 'FMFA Inc. Password Reset', // Subject line 
          text:'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n Please click on the following link, or paste this into your browser to complete the process: \n LINK \n If you did request this, please ignore this email and your password will remain unchanged.'        
      };
      console.log('this is the mail options', mailOptions); 

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              return console.log('this is the ', error);
          }
          console.log('Message sent: ' + info.response);
      });
    }
  }
})();


