const {
    insertHotel,
    getallhotels,
    deletehotel,
    updatehotel,
    gethotelbyid
} = require('../models/hotelsQuery');

// Render the form to add a new hotel
exports.addhotel = async (req, res) => {
    res.render('addhotels'); // Fixed view path
};

// Handle hotel insertion
exports.addhotels = async (req, res) => {
    const { name, address, city } = req.body;
    try {
        await insertHotel(name, address, city);
        res.redirect('/hotels');
    } catch (error) {
        console.error('Error in adding hotel:', error.message);
        res.status(500).send('Failed to insert hotel');
    }
};

// Get all hotels
exports.getallHotels = async (req, res) => {
    try {
        const hotels = await getallhotels();
        res.render('hotels', { hotels });
    } catch (error) {
        console.error('Error in getting hotel values:', error.message);
        res.status(500).send('Failed to access all hotels');
    }
};

// Delete a hotel
exports.deleteHotel = async (req, res) => {
    const { hotel_id } = req.params;
    try {
        await deletehotel(hotel_id);
        res.redirect('/hotels');
    } catch (error) {
        console.error('Error in deleting hotel:', error.message);
        res.status(500).send('Failed to delete hotel');
    }
};

// Update a hotel
exports.updateHotel = async (req, res) => {
    const { hotel_id } = req.params;
    const updateFields = req.body;
    try {
        await updatehotel(hotel_id, updateFields);
        res.redirect('/hotels');
    } catch (error) {
        console.error('Error in updating hotel:', error.message);
        res.status(500).send('Failed to update hotel');
    }
};

// Get hotel by ID
exports.gethotelbyId = async (req, res) => {
    const { hotel_id } = req.params;
    try {
        const hotel = await gethotelbyid(hotel_id);
        res.render('hotelid', { hotel }); // More descriptive variable
    } catch (error) {
        console.error('Error in getting hotel by ID:', error.message);
        res.status(500).send('Failed to get hotel by ID');
    }
};
