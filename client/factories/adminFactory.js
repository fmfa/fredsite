myApp.factory('adminFactory', function ($http, $cookies){
    var users = [];
    var factory = {};
    var classes = {}
    factory.getClasses = function(callback){
    $http.get('/getClasses').then(function(data){
      classes = data.data;
      callback(data.data);
    });
  }

  factory.searchForUser = function(user, callback){
    $http.post('/searchForUser', user).then(function(data){
      callback(data.data);
    });
  }

  factory.addUserToClass = function(info, callback){
    $http.post('/addUser', info).then(function(data){
      callback(data.data);
    });
  }

  factory.blockUser = function(user_id, callback){
    console.log("blockUser on adminFactory", user_id);
    $http.post('/blockUser', user_id).then(function(data){
      callback(data.data);
    });
  }
  factory.sendRegistrationEmail = function(email){
    $http.post('/registrationEmail', email);
  }


    return factory;
});
