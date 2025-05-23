const express = require('express');
const router = express.Router();
const RoomsController = require('../controllers/roomsController');

// GET: All rooms page
router.get('/', RoomsController.getallroomspage);

// GET: Add room form
router.get('/add', RoomsController.addrooms);

// POST: Add a new room
router.post('/add', RoomsController.addRooms);

// GET: Show edit room form by room_id
router.get('/:room_id/edit', RoomsController.editRooms);

router.post('/:room_id/update', RoomsController.updateRooms);

// GET: Get available room details (assuming by ID)
router.get('/:room_id/available', RoomsController.getavailableRooms);

// GET: Get room by hotel ID
router.get('/hotel/:hotel_id', RoomsController.getroombyhotel);

// GET: Get room by room ID
router.get('/:room_id', RoomsController.getroomsbyid);

// POST: Delete a room by room_id
router.post('/:room_id/delete', RoomsController.deleteRoom);

module.exports = router;
