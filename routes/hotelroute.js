const express = require('express');
const router = express.Router();
const HotelsController = require('../controllers/hotelsController');

// GET: Show form to add a new hotel
router.get('/hotels/add', HotelsController.addhotel);

// POST: Add a new hotel
router.post('/hotels/add', HotelsController.addhotels);

// GET: Get all hotels
router.get('/hotels', HotelsController.getallHotels);

// GET: Get hotel by ID
router.get('/hotels/:hotel_id', HotelsController.gethotelbyId);

// POST: Update hotel by ID
router.post('/hotels/:hotel_id/update', HotelsController.updateHotel);

// POST: Delete hotel by ID
router.post('/hotels/:hotel_id/delete',HotelsController.deleteHotel);

module.exports=router;