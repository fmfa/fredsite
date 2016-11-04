myApp.factory('mailFactory', function ($http, $cookies){
  var factory = {};
  factory.sendRegistrationEmail = function(email, callback){
    $http.post('/registrationEmail', email).then(function(data){
    	callback(data); 
    })
  }
  factory.forgotEmail = function(email, callback){
    $http.post('/forgotEmail', email).then(function(data){
    	console.log(data);
    	callback(data);
    })
  }
  factory.changeMessage = function(email){
  	console.log(email);
  	$http.post('/changeMessage', email);
  }
  factory.getMessage = function(callback){
  	$http.get('/getMessage').then(function(message){
  		callback(message.data);
  	})
  }

    return factory;
});
