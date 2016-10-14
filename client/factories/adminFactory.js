myApp.factory('adminFactory', function ($http, $cookies){
    var users = [];
    var factory = {};

    factory.getClasses = function(callback){
    $http.get('/getClasses').then(function(data){
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

    return factory;
});
