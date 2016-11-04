myApp.controller('adminController', function($scope, $location, $window, $timeout, $cookies, authFact, postsFactory, usersFactory, adminFactory, $rootScope, Upload, S3UploadService, mailFactory){
	$scope.regEmail = {}; 
	$scope.forgotPassword = {}; 
	$scope.email={};
	console.log('ADMIN CONTROLLER');

	var userCookie = authFact.getUserCookie();
	var classToRemoveUserFrom;

	console.log('global var userCookie: ', userCookie);


	if(userCookie.user.user_level != 9){
		// console.log('user level is NOT 9')
		$location.url('/');
	};

	$scope.uploadPic = function(file) {
		// console.log('hi uploadpic');
		file.upload = Upload.upload({
			url: 'http://localhost:8000/upload',
			data: {username: $scope.username, file: file},
			});

			file.upload.then(function (response) {
			$timeout(function () {
			file.result = response.data;
			});
			}, function (response) {
			if (response.status > 0)
			$scope.errorMsg = response.status + ': ' + response.data;
			}, function (evt) {
			// Math.min is to fix IE which reports 200% sometimes
			file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		});
	}
    
    // $scope.upload = function (file) {
    //     Upload.upload({
    //         url: 'http://localhost:8000/upload', //webAPI exposed to upload the file
    //         data:{file:file} //pass file as data, should be user ng-model
    //     }).then(function (resp) { //upload function returns a promise
    //         if(resp.data.error_code === 0){ //validate success
    //             $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
    //         } else {
    //             $window.alert('an error occured');
    //         }
    //     }, function (resp) { //catch error
    //         console.log('Error status: ' + resp.status);
    //         $window.alert('Error status: ' + resp.status);
    //     }, function (evt) { 
    //         console.log(evt);
    //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
    //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
    //         vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
    //     });
    // };












	// IF THE LOGGED IN USER'S LEVEL IS 9 (ADMIN), THEN :
	if (userCookie.user.user_level) {
		if(userCookie.user.user_level == 9){
			

			$scope.users = [];
			$scope.flaggedPosts = [];
			$scope.seeFlaggedPosts = true;
			$scope.manageUsers = false;
			$scope.showManageClasses = false;
			$scope.showClasses = false;
			$scope.showAddUserToClass = false;
			$scope.showEmails = false;
			mailFactory.getMessage(function(message){
				console.log(message);
				$scope.emailMessage = message; 
			})

			postsFactory.getFlaggedPosts(function(data){
				// console.log(data);
				$scope.flaggedPosts = data;
			});

			$scope.changeMessage = function(email){
				// console.log(email);
				mailFactory.changeMessage(email, function(data){
					console.log(data);
					$scope.emailMessage = data
					$scope.email = {};
				})
			}

			$scope.resetPassword = function(email){
				mailFactory.forgotEmail(email, function(data){
					console.log(data); 
					if(data.data.code == 200){
						$scope.resetStatus = data.data.status
					}
					else{
						$scope.resetError = data.data.status
					}
					$scope.forgotPassword = {}; 	
				})
				
			}

			$scope.deletePost = function(postId){
				postsFactory.deletePost(postId, function(status){
					postsFactory.getFlaggedPosts(function(data){
					// console.log(data);
					$scope.flaggedPosts = data;
				});
				});
			};

			$scope.deleteClass = function(classId){
				adminFactory.deleteClass(classId, function(status){
					console.log("status", status);
					// postsFactory.getFlaggedPosts(function(data){
					// // console.log(data);
					// $scope.flaggedPosts = data;
				// });
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
		 		$scope.showEmails = false;
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
				$scope.showEmails = false;
		 	}

		 	$scope.manageClasses = function(){
		 		console.log("at manageClasses");
		 		$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showEmails = false;
				$scope.showClasses = true;
				$scope.showAddUserToClass = false;
				console.log('seeFlaggedPosts: ', $scope.seeFlaggedPosts);
		 		adminFactory.getClasses(function(data){
					console.log('Here are the classes*********:',data);
					$scope.getClasses = data;
				});
		 	}

		 	$scope.addUserToClass= function(id, name){
		 		$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showClasses = false;
				$scope.showAddUserToClass = true;
				$scope.showEmails = false;
				$scope.showReset = false;
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

		 	$scope.addThisUserToClass = function(user_id, class_id, email){
		 		console.log('user_id: ', user_id, "class_id: ", class_id, "email: ", email);
		 		var info = {
		 			user_id: user_id,
		 			class_id: class_id
		 		};
		 		adminFactory.addUserToClass(info, function(data){
		 			console.log(data);
		 			$scope.userAdded = "User was added";
		 		})
		 		// var email = {
		 		// 	email: email
		 		// }
		 		// adminFactory.sendRegistrationEmail(email); 
		 	}
		 	$scope.sendRegistration = function(){
		 		console.log($scope.regEmail); 
		 		mailFactory.sendRegistrationEmail($scope.regEmail, function(data){
		 			console.log(data); 
		 				if(data.data.code == 200){
		 					$scope.status = data.data.status;
		 				}
		 				else{
		 					$scope.error = data.data.status;
		 				}
		 			// if(data.status == 500){
		 			// 	$scope.errorMessage = data.message;
		 			// }
		 		}); 
		 		$scope.regEmail = {}; 

		 	}

		 	$scope.backFromSearchForUser = function(){
		 		$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showClasses = true;
				$scope.showAddUserToClass = false;
				$scope.showEmails = false;
				$scope.showReset = false;
		 	}
		 	$scope.showemailForm=function(){
				$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showClasses = false;
				$scope.showAddUserToClass = false;
				$scope.showEmails = true;
				$scope.showReset = false;
		 	}

			$scope.showresetForm=function(){
				$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showClasses = false;
				$scope.showAddUserToClass = false;
				$scope.showEmails = false;
				$scope.showReset = true;
		 	}

		 	$scope.removeUserFromClass = function(class_id, class_name){
		 		$scope.seeFlaggedPosts = false;
				$scope.manageUsers = false;
				$scope.showClasses = false;
				$scope.showAddUserToClass = false;
				$scope.removeUser=true;
				$scope.showEmails = false;
				$scope.showReset = false;
				var class_id = class_id;

				classToRemoveUserFrom = class_id;
				// console.log("classToRemoveUserFrom:",classToRemoveUserFrom);

				$scope.classNameToRemoveUser = class_name;
				adminFactory.getClassToRemoveUser(class_id, function(data){
					console.log('Here is the class ********:',data);
					$scope.getClass = data[0];
				});
		 	}

		 	$scope.deleteRelationshipUserAndClass = function(user_id){
		 		console.log(user_id, classToRemoveUserFrom);
		 		var toRemove = {
		 			user: user_id,
		 			class: classToRemoveUserFrom
		 		}
		 		adminFactory.deleteRelationshipUserAndClass(toRemove, function(data){
		 			console.log("Removed User from class");
		 			console.log(data);
		 			
		 		})
		 	}

		 	$scope.blockUser=function(user_id){
		 		console.log("blockUser on admin Controller");
		 		var info = {
		 			user_id: user_id
		 		};
		 		adminFactory.blockUser(info, function(data){
		 			console.log("user Blocked: ", data);
		 			usersFactory.getUsers(function(data){
					console.log('THIS IS ALL THE USERS:',data);
					$scope.users = data.data;
					});
		 		})
		 	}

		};
	};
	//Chnage logo function 
	$scope.uploadFiles = function (file) {
		console.log(file);
		file.url = 'logo.jpg'

		// console.log('this is the file',file);
	    S3UploadService.Upload(file).then(function(result) {
	        // Mark as success
	        $scope.success = true;
	    }, function(error)  {
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
    };
	
	

 	// $scope.unblockUser=function(user_id){
 	// 	console.log("unblockUser on admin Controller");
 	// 	var info = {
 	// 		user_id: user_id
 	// 	};
 	// 	adminFactory.blockUser(info, function(data){
 	// 		console.log("user Blocked: ", data);
 	// 		usersFactory.getUsers(function(data){
		// 	console.log('THIS IS ALL THE USERS:',data);
		// 	$scope.users = data.data;
		// 	});
 	// 	})
 	// }


});
