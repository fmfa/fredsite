var express  = require( 'express' ),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    bp       = require('body-parser'),
    app      = express();

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// nodemailer setup
var nodemailer = require('nodemailer'); 
var smtpConfig ={
	service: "Gmail",
	host: 'smtp.gmail.com', 
	port: 465, 
	secure: true, 
	auth: {
		user: '****', 
		pass: '****' 
	}, 
	tls:{
		secureProtocol: "TLSv1_method"
	}
};

var transporter = nodemailer.createTransport(smtpConfig);

app.post('/registrationEmail', function(req, res){
	var mailOptions = {
		    from: 'FMFA@fmfa.org', 
		    to: '*******' , // list of receivers 
		    subject: 'setup for website password', // Subject line 
		    text: 'link that '
		  
		};
	console.log('this is the mail options', mailOptions); 

	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log('this is the ', error);
	    }
	    console.log('Message sent: ' + info.response);
	});
}); 



app.use( express.static( path.join( root, 'client' )));
app.use(express.static(path.join(__dirname, '/client/css')));
app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.json())


app.use(logger('dev'));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

var users = require('./server/models/user.js');
passport.use(new LocalStrategy(users.authenticate()));
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());


require('./server/config/db.js');
require('./server/config/routes.js')(app);

app.listen( port, function() {
  console.log( 'server running on port ${ port }' );
});
