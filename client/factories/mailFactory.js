myApp.factory('mailFactory', function ($http, $cookies){
  var factory = {};
  factory.sendRegistrationEmail = function(email){
    $http.post('/registrationEmail', email);
  }
  factory.forgotEmail = function(email){
    $http.post('/forgotEmail', email)
  }

    return factory;
});
