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
  factory.changeMessage = function(email, callback){
  	$http.post('/changeMessage', email).then(function(data){
  		callback(data);
  	})
  }
  factory.getMessage = function(callback){
  	$http.get('/getMessage').then(function(message){
  		callback(message);
  	})
  }

    return factory;
});
