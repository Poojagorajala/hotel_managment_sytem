const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

// Route to display all users page
router.get('/', UserController.getalluserpage);

// Route to show form for adding a new user
router.get('/add', UserController.adduserpage);

// Route to handle new user submission
router.post('/add', UserController.adduser);

// Route to handle user update
router.post('/:user_id/update', UserController.updateuserdetails);

// Route to handle user deletion
router.post('/:user_id/delete', UserController.deleteuser);

// **LOGIN ROUTES**
// Route to display the login form
router.get('/login', UserController.userlogin); // Assuming you have a loginPage function in your controller
// OR
// router.get('/login', (req, res) => 
//     res.render('login');
// });

// Route to handle login submission
router.post('/login', UserController.userlogin);

module.exports = router;

// const express = require('express');
// const router = express.Router();
// const UserController = require('../controllers/usersController');

// // Route to display all users page
// router.get('/users', UserController.getalluserpage);

// // Route to show form for adding a new user
// router.get('/users/add', UserController.adduserpage);

// // Route to handle new user submission
// router.post('/users/add', UserController.adduser);

// // Route to handle user update
// router.post('/users/:user_id/update', UserController.updateuserdetails);

// // Route to handle user deletion
// router.post('/users/:user_id/delete', UserController.deleteuser);

// // **LOGIN ROUTES**
// // Route to display the login form
// router.get('/login', (req, res) => {
//     res.render('login'); 
// });

// // Route to handle login submission
// router.post('/login', UserController.userlogin);

// module.exports = router;