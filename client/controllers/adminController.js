myApp.controller('adminController', function($scope, $location, $window, $timeout, $cookies, authFact, postsFactory, usersFactory){

	console.log('ADMIN CONTROLLEr');
	$scope.users = [];
	$scope.flaggedPosts = [];

	postsFactory.getFlaggedPosts(function(data){
		console.log(data);
		$scope.flaggedPosts = data;
	});

	usersFactory.getUsers(function(data){
		console.log('THIS IS ALL THE USERS:',data);
		$scope.users = data.data;
	});

	$scope.deletePost = function(postId){
		postsFactory.deletePost(postId, function(status){
			postsFactory.getFlaggedPosts(function(data){
			// console.log(data);
			$scope.flaggedPosts = data;
		});
		});
	};

	$scope.deleteUser = function(userId){
		usersFactory.deleteUser(userId, function(data){
			console.log('removed this user:', data);
			usersFactory.getUsers(function(dat){
				console.log('THIS ARE THE USERS:',dat);
				$scope.users = dat.data;
			});
		});
	};
	$scope.unflagPost = function(postId){
		console.log("unflag post pressed",postId);
 		postsFactory.unflagPost(postId, function(status){
 			postsFactory.getFlaggedPosts(function(data){
		 		// console.log(data);
		 		$scope.flaggedPosts = data;
		 	});
 		});
 	};

 	$scope.createClass = function(){
 		console.log('creating class', $scope.class.emails);
 		$scope.class.emails = $scope.class.emails.split(/(?:,|)+/);
 		console.log($scope.class.emails);
 		usersFactory.createClass($scope.class, function(data){
			console.log('THIS is the new class:',data);
			
		});

 	}


});
