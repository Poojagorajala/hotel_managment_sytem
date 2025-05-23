const express = require('express');
const router = express.Router();
const UserController = require('../controllers/usersController');

// Show all users
router.get('/', UserController.getalluserpage);

// Show add user form
router.get('/users/add', UserController.adduserpage);

// Add new user
router.post('/users/add', UserController.adduser);

// Show edit user form
router.get('/users/:user_id/edit', UserController.edituserpage);

// Update user details
router.post('users/:user_id/update', UserController.updateuserdetails);

// // Delete user
// router.post('/users/:user_id/delete', UserController.deleteuser);

// Login routes

// // Show confirmation page (GET)
router.get('/users/:user_id/delete', UserController.showDeleteConfirmation);

// Actually delete user (POST)
router.post('/users/:user_id/delete', UserController.deleteuser);


router.post('/login', UserController.userlogin); // process login

module.exports = router;
