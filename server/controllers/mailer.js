// nodemailer setup
var nodemailer = require('nodemailer'); 
var smtpConfig ={
  service: "Gmail",
  host: 'smtp.gmail.com', 
  port: 465, 
  secure: true, 
  auth: {
    user: 'fake@gmail.com', 
    pass: 'fake' 
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
        if(error){
            return console.log('this is the ', error);
        }
        console.log('Message sent: ' + info.response);
    });
    }
  }
})();


