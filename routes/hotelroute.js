const express = require('express');
const router = express.Router();
const HotelsController = require('../controllers/hotelsController');

// GET: Show form to add a new hotel
router.get('/add', HotelsController.addhotel);

// POST: Add a new hotel
router.post('/add', HotelsController.addhotels);

// GET: Get all hotels
router.get('/', HotelsController.getallHotels);

// GET: Get hotel by ID
router.get('/:hotel_id', HotelsController.gethotelbyId);

// POST: Update hotel by ID
router.post('/:hotel_id/update', HotelsController.updateHotel);

// POST: Delete hotel by ID
router.post('/:hotel_id/delete', HotelsController.deleteHotel);

//GET : Edit the hotel 
router.get('/:hotel_id/edit', HotelsController.edithotels);



// Your other routes...
router.post('/:hotel_id/update', HotelsController.updateHotel);

module.exports = router;


module.exports = router;