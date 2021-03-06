myApp.controller('loginController', function($scope, $location, $window, $timeout, $cookies, authFact, postsFactory, usersFactory, mailFactory){
    $scope.forgot = {};
    $scope.forgotEmail = function(forgot){
      // console.log(forgot);   
      mailFactory.forgotEmail(forgot, function(data){
        console.log(data.data);
        if(data.data.code == 200){
          $scope.status = data.data.status
        }
        else{
          $scope.errorStatus = data.data.status
        }
      });
      $scope.forgot = {}; 
    }

    $scope.register = function (){
      // console.log("*** front-end indexController -- $scope.register ***");
      // console.log('new_user information', $scope.new_user);
      usersFactory.createUser($scope.new_user, function(data){
        if(data.data.isLoggedIn){
          // console.log(" *!*!*! usersFactory.createUser -- data.data: ", data.data);
            authFact.setUserCookie(data.data.userCookie._id, data.data.userCookie.first_name, data.data.userCookie.last_name, data.data.userCookie.email, data.data.userCookie.user_level, data.data.userCookie._class, data.data.userCookie._following);

            authFact.setAccessToken(data.data.authentication);
            $location.url('/');
            // $window.location.reload();
        }
        else if(data.data.status === 500){
          $scope.errorMsg = data.data.message;
        }
      });
    };


    $scope.login = function (){
      usersFactory.login($scope.loginInfo, function (data){
        console.log("LOGIN: ", data);
        if (data.data.status === 500){
            $scope.errorMsg = data.data.message;
        }
        else if(data.data.status === 200){
            // console.log('authFact.setUserCookie');
            console.log(" *!*!*! usersFactory.login -- data.data: ", data.data);
            authFact.setUserCookie(data.data.userCookie._id, data.data.userCookie.first_name, data.data.userCookie.last_name, data.data.userCookie.email, data.data.userCookie.phone, data.data.userCookie.user_level, data.data.userCookie._class, data.data.userCookie._following);
            authFact.setAccessToken(data.data.authentication);
            $location.url('/');
        }
      });
    };


});
