const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/bookingsController');

// GET: Show form to add a new booking
router.get('/add', BookingsController.addbooking);

// POST: Add a new booking
router.post('/add', BookingsController.addbookings);

// GET: Get all bookings
router.get('/', BookingsController.getallbookings);

// GET: Get booking by user ID
router.get('/user/:user_id', BookingsController.getbookingbyUser);

// GET: Get booking by room ID
router.get('/room/:room_id', BookingsController.getbookingbyRoom);

// GET: Get booking by hotel ID
router.get('/hotel/:hotel_id', BookingsController.getbookingbyId);

module.exports=router;
