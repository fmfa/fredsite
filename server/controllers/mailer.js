var mongoose = require('mongoose');
var secret = require('./app.js');
var crypto = require('crypto');
var async = require('async');
var User = mongoose.model('users');
var Email = mongoose.model('emails')
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

//Excel to json
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

var upload = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');
    /** API path that will upload the files */


module.exports = (function() {
  return {
    getMessage: function(req,res){
      Email.find({}, function(err, message){
        if(err){
          console.log('error', err); 
        }
        else{
          console.log(message)
          res.json(message);
        }
      })
    },
    changeMessage: function(req,res){
      // console.log(req.body);
      Email.findByIdAndUpdate({ _id : '581cab5a7ad3a81544df4bf5'},req.body, function(err,message){
        if(err){
          console.log('error', err); 
        }
      })
      // var message = new Email(req.body);
      // message.save(function(err, message){
      //   if(err){
      //     console.log('error', err)
      //   }
      //   else{
      //     console.log('message was saved', message);
      //   }
      // })

    },
    registration: function(req, res){
      console.log(req.body);
      Email.find({}, function(err, message){
        if(err){
          console.log('error', err); 
        }
        else{
          console.log(message);
          var mailOptions = {
              from: 'FMFA@fmfa.org', 
              to: req.body.email, // list of receivers 
              subject: 'Welcome to FMFA Inc.', // Subject line 
              text: 'Hello there, \n \n'+ message[0].message +'\n \nThanks, \n Fred Fowler'
            
          };
          console.log('this is the mail options', mailOptions); 

          transporter.sendMail(mailOptions, function(error, info){
              console.log('inside the transporter')
              if(error){
                  console.log('this is the ', error);
                  res.json({status:'Error in sending out registration email', code:500});
                  return console.log('this is the ', error);
              }
              console.log('Message sent: ' + info.response);
              res.json({status: 'Registration email has been sent', code: 200})
          });
        }
      })
    
    }, 
    uploadExcel: function(req, res){
      var exceltojson;
      upload(req,res,function(err){
          if(err){
               res.json({error_code:1,err_desc:err});
               return;
          }
          /** Multer gives us file info in req.file object */
          if(!req.file){
              res.json({error_code:1,err_desc:"No file passed"});
              return;
          }
          /** Check the extension of the incoming file and 
           *  use the appropriate module
           */
          if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
              exceltojson = xlsxtojson;
          } else {
              exceltojson = xlstojson;
          }
          console.log(req.file.path);
          try {
              exceltojson({
                  input: req.file.path,
                  output: null, //since we don't need output.json
                  lowerCaseHeaders:true
              }, function(err,result){
                  if(err) {
                      return res.json({error_code:1,err_desc:err, data: null});
                  } 
                  console.log(result);
                  var result2 = JSON.stringify(result);
                  console.log(result2);

                  // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                  
                  // for(var i = 0; i < result.length; i++){
                  //   var emailAddress = re.exec(result[i]); 
                  //   console.log(emailAddress);
                  // }                  
                  // for(var i = 0; i < result.length; i++){
                  //   console.log(result[i].email);
                  //   var mailOptions = {
                  //     from: 'FMFA@fmfa.org', 
                  //     to: result[i].email, // list of receivers 
                  //     subject: 'Welcome to FMFA Inc.', // Subject line 
                  //     text: 'Hello there, \n \n Welcome to FMFA Inc. Please register for the website at locahost:8000/register \n \nThanks, \n Fred Fowler'  
                  //   };
                  //   transporter.sendMail(mailOptions, function(error, info){
                  //       console.log('inside the transporter')
                  //       if(error){
                  //           return console.log('this is the ', error);
                  //       }
                  //       console.log('Message sent: ' + info.response);
                  //   });


                  // }
                  //mailer functionality
                  // var mailOptions = {
                  //   from: 'FMFA@fmfa.org', 
                  //   to: result.emails, // list of receivers 
                  //   subject: 'Welcome to FMFA Inc.', // Subject line 
                  //   text: 'Hello there, \n \n Welcome to FMFA Inc. Please register for the website at locahost:8000/register \n \nThanks, \n Fred Fowler'  
                  // };

                  // res.json({error_code:0,err_desc:null, data: result});
              });
          } catch (e){
              res.json({error_code:1,err_desc:"Corupted excel file"});
          }
      })
    },

    forgotEmail: function(req, res){
      crypto.randomBytes(8, function(err, buf) {
        var token = buf.toString('hex');
        console.log(token);
        User.findOne({email:req.body.email}, function(err, user){
            if (err) {
                res.json({status: 'Email does not exist in system'})
                return console.log('this is the error,', err)
            } else {
                if(!user){
                  res.json({status: 'Email does not exist in system'})
                  return console.log('this is the error,', err)
                }
                else{
                  user.password = secretPassword(token);
                  user.save(function(err){
                    if(err){
                      console.log('there was an error with pw reset')
                    }
                    else{
                      var mailOptions = {
                        from: 'FMFA@fmfa.org', 
                        to: req.body.email, // list of receivers 
                        subject: 'FMFA Inc. Password Reset', // Subject line 
                        text:'You are receiving this because you (or someone else) have requested the reset of the password for your account. \n We have reset your password to ' + token + '. Please use this password to login and subsequently change your password'        
                      };
                      console.log('this is the mail options', mailOptions); 

                      transporter.sendMail(mailOptions, function(error, info){
                          if(error){
                              res.json({status:'Error in sending out password reset emails', code:500});
                              return console.log('this is the ', error);
                          }
                          console.log('Message sent: ' + info.response);
                          res.json({status: 'Registration email has been sent', code: 200})
                      });
                    }
                  });
                }
                
            }
        });
        
      });
      
    }
  }
})();


