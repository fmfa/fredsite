myApp.controller('adminController', function($scope, $location, $window, $timeout, $cookies, authFact, postsFactory, usersFactory, adminFactory){

	console.log('ADMIN CONTROLLEr');
	$scope.users = [];
	$scope.flaggedPosts = [];
	$scope.seeFlaggedPosts = true;
	$scope.manageUsers = false;
	$scope.showManageClasses = false;
	$scope.showClasses = false;
	$scope.showAddUserToClass = false;

	postsFactory.getFlaggedPosts(function(data){
		console.log(data);
		$scope.flaggedPosts = data;
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
 		// console.log('creating class', $scope.class.emails);
 		// $scope.class.emails = $scope.class.emails.split(/(?:,|)+/);
 		console.log($scope.class);
 		usersFactory.createClass($scope.class, function(data){
			console.log('THIS is the new class:',data.data);
			
		});

 	}

 	$scope.seeManageUsers=function(){
 		usersFactory.getUsers(function(data){
		console.log('THIS IS ALL THE USERS:',data);
		$scope.users = data.data;
		});

		$scope.seeFlaggedPosts = false;
		$scope.manageUsers = true;
		$scope.showClasses = false;
		$scope.showAddUserToClass = false;
 	}

 	$scope.showFlaggedPosts = function(){
 		$scope.seeFlaggedPosts = true;
		$scope.manageUsers = false;
		$scope.showClasses = false;
		$scope.showAddUserToClass = false;
 	}

 	$scope.manageClasses = function(){
 		$scope.seeFlaggedPosts = false;
		$scope.manageUsers = false;
		$scope.showClasses = true;
		$scope.showAddUserToClass = false;
		console.log('seeFlaggedPosts: ', $scope.seeFlaggedPosts);
 		adminFactory.getClasses(function(data){
			console.log('Here are the classes:',data);
			$scope.getClasses = data;
		});
 	}

 	$scope.addUserToClass= function(id, name){
 		$scope.seeFlaggedPosts = false;
		$scope.manageUsers = false;
		$scope.showClasses = false;
		$scope.showAddUserToClass = true;

 		$scope.classNameToAddUser = name;
 		$scope.classIdToAddUser = id;
 	}

 	$scope.searchForUser = function(findUser){
 		console.log("findUser: ", findUser);
 		adminFactory.searchForUser(findUser, function(data){
 			console.log(data);
 			$scope.foundUsers = data;
 		})
 	}

 	$scope.addThisUserToClass = function(user_id, class_id){
 		console.log('user_id: ', user_id, "class_id: ", class_id);
 		var info = {
 			user_id: user_id,
 			class_id: class_id
 		};
 		adminFactory.addUserToClass(info, function(data){
 			console.log(data);
 			$scope.userAdded = "User was added";
 		})
 	}


});
