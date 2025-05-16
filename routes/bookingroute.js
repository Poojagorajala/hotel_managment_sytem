const express = require('express');
const router = express.Router();
const BookingsController = require('../controllers/bookingsController');

// GET: Show form to add a new booking
router.get('/bookings/add', BookingsController.addbooking);

// POST: Add a new booking
router.post('/bookings/add', BookingsController.addbookings);

// GET: Get all bookings
router.get('/bookings', BookingsController.getallbookings);

// GET: Get booking by user ID
router.get('/bookings/user/:user_id', BookingsController.getbookingbyUser);

// GET: Get booking by room ID
router.get('/bookings/room/:room_id', BookingsController.getbookingbyRoom);

// GET: Get booking by hotel ID
router.get('/bookings/hotel/:hotel_id', BookingsController.getbookingbyId);

module.exports=router;
