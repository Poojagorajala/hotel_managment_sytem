const {
    insertHotel,
    getallhotels,
    deletehotel,
    updatehotel,
    gethotelbyid,
    edithotel,
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

exports.updateHotel = async (req, res) => {
  const { hotel_id } = req.params;
  const { name, address, city } = req.body;

  // Basic validation
  if (!name || !address || !city) {
    return res.status(400).send("All fields are required.");
  }
  if (name.length > 30 || address.length > 30 || city.length > 30) {
    return res.status(400).send("Input values must be 30 characters or fewer.");
  }

  try {
    await updatehotel(hotel_id, name, address, city);
    res.redirect("/hotels");
  } catch (error) {
    console.error("Error in updating hotel:", error.message);
    res.status(500).send("Failed to update hotel");
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

//editing an hotel

// Render the edit form for a hotel
exports.edithotels = async (req, res) => {
    const { hotel_id } = req.params;
    try {
        const hotel = await gethotelbyid(hotel_id);
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }
        res.render('edithotel', { hotel }); // Renders edithotel.ejs with hotel data
    } catch (error) {
        console.error('Error in rendering hotel edit form:', error.message);
        res.status(500).send('Failed to load hotel for editing');
    }
};
