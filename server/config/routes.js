var postsController = require('../controllers/posts.js')
var usersController = require('../controllers/users.js')
var adminController = require('../controllers/admin.js')

 module.exports = function(app){

 	app.post('/posts', function(req, res){
 		postsController.makePost(req, res);
 	})
 	app.post('/search', function(req, res){
 		// console.log('search posts query');
 		postsController.searchPosts(req, res);
 	})
  app.post('/posts/array', function(req, res){
    postsController.getPostsByArray(req, res);
  })
 	app.get('/posts', function(req, res){
 		postsController.getPosts(req, res);
 	})
  app.post('/posts/:id/edit', function(req, res){
    // console.log('got to the edit post route', req.body);
    postsController.editPost(req, res);
  })
 	app.post('/posts/:id/destroy', function(req, res){
 		// console.log('got to the destroy post route');
 		postsController.destroyPost(req, res);
 	})
  app.post('/posts/:id/flag', function(req, res){
 		// console.log('got to the flag post route');
 		postsController.flagPost(req, res);
 	})
  app.post('/posts/:id/unflag', function(req, res){
 		// console.log('got to the unflag post route');
 		postsController.unflagPost(req, res);
 	})
  app.post('/comments/:id/destroy', function(req, res){
    // console.log('got to the destroy comment route');
    postsController.destroyComment(req, res);
  })

  app.post('/comments', function(req, res){
    // console.log('got to the make a comment route');
    postsController.commentPost(req, res);
  })

  app.post('/updateUser', function (req,res) {
    // console.log('req.body', req.body);
    usersController.updateUser(req, res);
  })

  //#############################################
      // Users routes
  //#############################################
  app.post('/createUser', function (req,res){
    // console.log('Back-end routes -- app.post /createUser ');
    // console.log('req.body', req.body);
    // req.body.lastName  = first Name
    // req.body.firstName = last Name
    // req.body.email     = email
    // req.body.password  = user password
    // console.log('req.session', req.session);
    usersController.createUser(req, res);
  });
  app.post('/login', function (req, res){
    // console.log('Back-end routes -- app.post /login ');
    // console.log('req.body', req.body);
    usersController.login(req, res);
  });
  // app.get('/userInformation', function (req, res){
    // console.log('Back-end routes -- app.get /userInformation ');
    // console.log('req.body', req.body);
  //   usersController.userInformation(req, res);
  // });
  app.get('/logout', function (req, res){
    // console.log('Back-end routes -- app.get /logout ');
    // console.log('logout route -- req.body', req.body);

    usersController.logout(req, res);
  });
  app.post('/usersearch', function (req,res) {
    // console.log('Back-end routes -- app.post /usersearch ');
    // console.log('req.body', req.body);
    usersController.searchName(req, res);
  })
  app.get('/users', function (req, res){
    // console.log('get users route');
    usersController.getUsers(req, res);
  });
  app.post('/users/:id/destroy', function(req, res){
    // console.log('got to the destroy user route');
    usersController.destroyUser(req, res);
  })
  // app.post('/silliconValleyFacesWall', function (req, res){
    // console.log('Back-end routes -- app.get /silliconValleyFacesWall ');
    // console.log('welcome to silliconValleyFacesWall');
  // });

  app.post('/imgUrl/:id', function(req, res){
    // console.log('made it to the upload image route')
    usersController.uploadUrl(req, res);
  })

  //#############################################
      // Admin routes
  //#############################################
  app.post('/admi_login', function (req, res){
    // console.log('Back-end routes -- app.post /admin_login ');
    // console.log('req.body', req.body);
    usersController.admin_login(req, res);
  });

  app.post('/searchForUser', function (req, res){
    adminController.searchForUser(req, res);
  });

  app.get('/flagged_posts', function(req, res){
 		postsController.getFlaggedPosts(req, res);
 	});

  app.get('/getClasses', function(req, res){
    adminController.getClasses(req, res);
  });

  app.post('/createClass', function (req, res){
    console.log('Back-end routes -- app.post /createClass ');
    // console.log('req.body', req.body);
    usersController.createClass(req, res);
  });

  app.post('/updatePassword', function(req, res){
    usersController.updatePassword(req, res);
  });

  app.post('/addUser', function(req, res){
    adminController.addUserToClass(req, res);
  });

  app.post('/blockUser', function(req, res){
    console.log("\n\n\n\n\n********************************************got to blockUser\n\n\n\n\n\n", req.body);
    adminController.blockUser(req, res);
  });


}
