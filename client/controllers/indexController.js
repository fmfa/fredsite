myApp.controller('indexController', function($scope, $rootScope, $location, $window, $timeout, $cookies, $sce, authFact, postsFactory, usersFactory, Upload, S3UploadService){


	$scope.comment = {};


	$scope.choice = 'all';
	$scope.choose = function(whichOne){
	    $scope.choice = whichOne;
	    console.log('scope.choice', $scope.choice)
	}

	$scope.follow = function(userId){
		var userInfo = {
			follower: userCookie.user._id,
			following: userId
		}
		usersFactory.followUser(userInfo, function(data){
			console.log('back in controller', data);
			postsFactory.getPostsByArray(data.data._following, function(dat){
		 		console.log('PEOPLE I FOLLOW POSTS:' ,dat);
		 		$scope.followingPosts = dat;
				authFact.setFollow($scope.followingPosts);
		 	});
			// console.log('FOLLOWIN POSTs:', $scope.followingPosts)
		})
	}

	$scope.unfollow = function(userId){
		var userInfo = {
			follower: userCookie.user._id,
			following: userId
		}
		usersFactory.unfollowUser(userInfo, function(data){
			console.log('back in controller', data.data);
			postsFactory.getPostsByArray(data.data._following, function(dat){
		 		console.log('PEOPLE I FOLLOW POSTS:' ,dat);
		 		$scope.followingPosts = dat;
		 		authFact.setFollow($scope.followingPosts);
		 	});
			// console.log('FOLLOWIN POSTs:', $scope.followingPosts)
			
		})
	}

	var userCookie = authFact.getUserCookie();

	console.log('globla var userCookie: ', userCookie);
	console.log("rootScope: ", $rootScope);

	$scope.isLogged = function (){
		return authFact.getAccessToken();
	};

	$scope.trustSrc = function(src){
		return $sce.trustAsResourceUrl(src);
	};

	if(authFact.getUserCookie()){
		$rootScope.user = userCookie.user;
		$rootScope.user.url = 'https://s3-us-west-1.amazonaws.com/siliconvalleyfaces/'+userCookie.user._id+'.jpg'
	}


	refreshPosts = function (){
		postsFactory.getPosts(function(data){
	 		console.log(data);
	 		$scope.posts = data;
	 	});
	};

	postsFactory.getPosts(function(data){
 		console.log('ALL POSTS:', data);
 		$scope.posts = data;
 	});

 	
 	if(userCookie && userCookie.user._class){
 		// GET POSTS OF PEOPLE IN MY CLASS
 		postsFactory.getPostsByArray(userCookie.user._class._users, function(data){
	 		console.log('PEOPLE IN MY CLASS POSTS:' ,data);
	 		$scope.myClassPosts = data;
	 	});
	 	// GET POSTS OF PEOPLE I FOLLOW
	 	postsFactory.getPostsByArray(userCookie.user._following, function(data){
	 		console.log('PEOPLE I FOLLOW POSTS:' ,data);
	 		$scope.followingPosts = data;
	 	});
 	}

 	


	$scope.feed = true;
	$scope.search = {};

	$scope.reset = function(){
		postsFactory.getPosts(function(data){
	 		// console.log(data);
	 		$scope.posts = data;
	 		$scope.feed = true;
	 		$scope.search.text = null;
	 	});

	}


	$scope.addPost = function(user_id){
 		$scope.post._user_id = user_id;
 		postsFactory.addPost($scope.post, function(data){
			console.log("postsFactory.addPost(", data);
			$scope.post = null;
			// $scope.posts.unshift(data.data);
			console.log('DATA BACK', data.data);
			refreshPosts();
 		});
 	};

 	$scope.grabPost = function(index){
 		$scope.grabbedPost = index
 		console.log("grabbed post",$scope.grabbedPost)
 	};

 	$scope.showProjects = function(){
 		// console.log("here are projects");
 		usersFactory.getProjects(function(data){
 			console.log(data);
 			$scope.upcomingProjects = data.data;
 			$scope.choose('upcomingProjects');
 		});
 	};

 	//edit post
 	$scope.editPost = function(_id, title, url, urlVideo, text){
		console.log("$scope.editProfile - editing the post with _id: ", _id);
		$scope.editPost = {
			"_id": _id,
			"title": title,
			"url": url,
			"urlVideo": urlVideo,
			"text": text
		};
		console.log("*** made it to editPost ***");
		console.log("$scope.editPost: ", $scope.editPost);
		postsFactory.updatePost($scope.editPost, function(data){
			console.log(data);
			$scope.post = null;
			console.log('DATA BACK', data.data);

		});
	};

 	$scope.deletePost = function(postId){
 		postsFactory.deletePost(postId, function(status){
 			postsFactory.getPosts(function(data){
		 		// console.log(data);
		 		$scope.posts = data;
		 	});
 		});
 	};

	$scope.flagPost = function(postId){
		console.log("flag post pressed",postId);
 		postsFactory.flagPost(postId, function(status){
 			postsFactory.getPosts(function(data){
		 		// console.log(data);
		 		$scope.posts = data;
		 	});
 		});
 	};

 	$scope.searchPosts = function(search){
 		// console.log('at the searchPosts controller function');
 		postsFactory.searchPosts(search, function(data){
 			// console.log("search results:", data);
 			$scope.posts = data;
 			$scope.feed = false;
 		});
 	};

//#######################################################
//use the following code if any conflict occurred
 	$scope.commentPost = function(postId){
		console.log("$scope.commentPost - postId = ", postId);
		console.log("$scope.commentPost - $scope.comment[postId] = ", $scope.comment[postId]);
		console.log("$scope.commentPost - $scope.comment[postId].text = ", $scope.comment[postId].text);
 		var commentData = {
 			text: $scope.comment[postId].text,
 			_user_name: $rootScope.user.first_name+ " "+$rootScope.user.last_name ,
 			_user: $rootScope.user._id,
 			_post : postId,
 		};

//#######################################################
//use the following code if any conflict occurred
 		postsFactory.commentPost(commentData, function(){
			refreshPosts();
			$scope.comment = {};
 		});
 	};
//use the above code if any conflict occurred
//#######################################################

 	$scope.deleteComment = function(commentId){
 		postsFactory.deleteComment(commentId, function(status){
 			// console.log('status deleting comment:', status);
 			postsFactory.getPosts(function(dat){
	 			// console.log('THIS ARE THE POSTS',dat);
	 			$scope.posts = dat;
	 		});
 		});
 	};

//#######################################################
//use the following code if any conflict occurred
	$scope.editProfile = function(user_id, first_name, last_name, user_email, phone){
		console.log("$scope.editProfile - editing the user with user_id: ", user_id);
		$scope.edit = {
			"user_id": user_id,
			"first_name": first_name,
			"last_name": last_name,
			"email": user_email,
			"phone": phone
		};
		console.log("*** made it to editProfile ***");
		console.log("$scope.edit: ", $scope.edit);
		// console.log("edit.phone:", $scope.edit.phoneShare);
		// console.log("edit.phone:", $scope.edit.emailShare);
		usersFactory.updateUser($scope.edit, function(data){
			console.log(data);
			$cookies.remove('userCookie');
			authFact.setUserCookie(data.data._id, data.data.first_name, data.data.last_name, data.data.email, data.data.phone);
			authFact.getUserCookie();
			console.log('after edit user -- $rootScope.user: ', $rootScope.user);
		});
	}

	$scope.changePassword = function(){
		// console.log(userCookie)
		$scope.pswd.userId = userCookie.user._id;
		// console.log($scope.pswd);
		usersFactory.updatePassword($scope.pswd, function(data){
			console.log('back in the controller', data);
			if(data.data.status == 'Incorrect old password'){
				$scope.result = 'error';
			}
			else if(data.data.status == 'ok!'){
				$scope.result = 'ok';
				$scope.pswd = {};
				$scope.registerForm.password.$pristine = true;
				$scope.registerForm.confirmPassword.$pristine = true;
				$scope.registerForm.password.$error.required= false;
				$scope.registerForm.password.$touched = false;
				$scope.registerForm.confirmPassword.$touched = false;
			}

		});
	};

	$scope.logout = function(){

	  $rootScope.user_id = 	undefined;
		$rootScope.user = undefined;
		// $rootScope = {};
		console.log('before the user logout = ', $rootScope);
	  // usersFactory.logout();
		$cookies.remove('accessToken');
		$cookies.remove('userCookie');
		// $window.localStorage.clear();
		console.log('*!*! user is login out $rootScope = ', $rootScope);
	  $location.url('/login');
	};


	//Find a Person
	$scope.searchUsers = function(){
 		console.log("*** front-end indexController -- $scope.searchUsers ***");
 		usersFactory.searchUsers($scope.SearchName, function(data){
 			console.log(" users search results:", data);
 			$scope.users = data;
 			$scope.feed = false;
 		});
 	};

 	$scope.removeProfile = function(userId){
		usersFactory.deleteUser(userId, function(data){
			console.log('removed this user:', data);
			$location.url('/login');
		});
	};
	// upload image functionality
	//################################
	$scope.myImage='';
    $scope.myCroppedImage='';

    var handleFileSelect=function(evt) {
      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.uploadFiles = function (file) {

    	var cropped = Upload.dataUrltoBlob(file);
        // console.log($scope.user);
        // console.log(files[0]);

        cropped.url = $scope.user._id+'.jpg';

        // console.log(file);
        // $scope.Files = files;
        // console.log($scope.Files);
        // file = $scope.Files
        $scope.File = file;

		// console.log('this is the file',file);
	    S3UploadService.Upload(cropped).then(function (result) {
	        // Mark as success
	        $scope.success = true;
	    }, function (error)  {
	        // Mark the error
	        $scope.error = error;
	    }, function (progress) {
	        // Write the progress as a percentage
	        $scope.progress = (progress.loaded / progress.total) * 100
	        console.log(progress);
            setTimeout(function(){
        		location.reload()
			}, 1200)
	    });

        usersFactory.uploadPhoto($scope.user._id, function(data){
            console.log(data);
        })


    };
    //#########################ENDS##############

});

myApp.filter('trusted', ['$sce', function ($sce){
	return function(url){
		console.log('this is url', url)
		var video_id = url.split('v=')[1];
		return $sce.trustAsResourceUrl('https://www.youtube.com/embed/' + video_id);
	}
}]);

myApp.filter('capitalize', function() {
  return function(input, scope) {
    if (input!=null)
    input = input.toLowerCase();
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }
});

myApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

myApp.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
});
