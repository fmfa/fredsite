myApp.factory('usersFactory', function ($http){
    var users = [];
    var factory = {};
// get logged in user information
      factory.index = function (callback){
        $http.get('/userInformation')
        .then(function (data){
          callback(data);
        });
      };

      factory.createUser = function (userInfo, callback){
        console.log("*** front-end usersFactory.js -- factory.createUser ***");
        console.log(userInfo);
        $http.post('/createUser', userInfo)
        .then(function(data){
          callback(data);
        });
      };
      factory.login = function (userInfo, callback){
        console.log("*** front-end usersFactory.js -- factory.login***");
        console.log(userInfo);
        $http.post('/login', userInfo)
        .then(function (data){
          callback(data);
        });
      };
    return factory;
});