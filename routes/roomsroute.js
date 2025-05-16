const express = require('express');
const router = express.Router();
const RoomsController = require('../controllers/roomsController');

// GET: All rooms page
router.get('/rooms', RoomsController.getallroomspage);

// GET: Add room form
router.get('/rooms/add', RoomsController.addrooms);

// POST: Add a new room
router.post('/rooms/add', RoomsController.addRooms);

// POST: Update a room
router.post('/rooms/:room_id/update', RoomsController.updateRooms);

// GET: Get available room details (assuming by ID)
router.get('/rooms/:room_id/available', RoomsController.getavailableRooms);

// GET: Get room by hotel ID
router.get('/rooms/hotel/:hotel_id', RoomsController.getroombyhotel);

// GET: Get room by room ID
router.get('/rooms/:room_id', RoomsController.getroomsbyid);

module.exports = router;

