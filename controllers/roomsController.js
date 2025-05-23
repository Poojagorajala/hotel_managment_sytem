const {
    insertrooms,
     editRooms,
    getAvailablerooms,
    getallrooms,
    getroombyHotel
    ,getroombyId,
    deleteroom,

}=require('../models/roomsQuery');

exports.addrooms=async(req,res)=>{
    res.render('addRooms');

}
exports.addRooms=async(req,res)=>{
    const {hotel_id,room_type,price,availability}=req.body;
    try{
        const newroom=await insertrooms(hotel_id,room_type,price,availability);
        res.redirect('/rooms');
    }catch(error){
        console.error('error in adding the rooms',error.message);
        res.status(500).send('failed to add rooms');
    }
};

exports.updateRooms = async (req, res) => {
  const { room_id } = req.params;
  const { hotel_id, room_type, price, availability } = req.body;

  // Build object with allowed fields only
  const updateFields = { hotel_id, room_type, price, availability };

  try {
    const result = await updateroom(room_id, updateFields);

    // Assuming updateroom returns number of rows updated
    if (result.rowCount === 0) {
      return res.status(404).send('Room not found');
    }

    res.redirect('/rooms');
  } catch (error) {
    console.error('Error updating rooms:', error.message);
    res.status(500).send('Failed to update rooms');
  }
};


exports.getavailableRooms=async(req,res)=>{
    const {room_id}=req.params;
    try{
        const availableroom=await getAvailablerooms(room_id);
        res.render('roomsdetails',{availableroom});
    }catch(error){
        console.error('error in fetching available rooms details',error.message);
        res.status(500).send('failed to access available rooms');
    }
};

exports.getallroomspage=async(req,res)=>{
    try{
        const rooms=await getallrooms();
        res.render('rooms',{rooms});
    }catch(error){
        console.error('error in accessing the rooms',error.message);
        res.status(500).send('error in rooms page');
    }
};

exports.getroombyhotel=async(req,res)=>{
    const {hotel_id}=req.params;
    try{
        const roomsbyhotel=await getroombyHotel(hotel_id);
        res.render('roomsbyhotel',{roomsbyhotel});
    }catch(error){
        console.error('error in getting the hotel',error.message);
        res.status(500).send('error in the rooms by hotel');
    }
};

exports.getroomsbyid = async (req, res) => {
    const { room_id } = req.params;
    console.log(`[DEBUG] Attempting to get room details for ID: ${room_id}`); // Line A
    try {
        const room = await getroombyId(room_id); // This calls your model
        console.log('[DEBUG] Fetched room from DB:', room); // Line B

        if (room) {
            res.render('roomDetails', { room: room }); // Ensure this is the correct EJS file name
            console.log(`[DEBUG] Rendered roomDetails.ejs for room ID: ${room_id}`); // Line C
        } else {
            console.log(`[DEBUG] Room with ID ${room_id} not found.`); // Line D
            res.status(404).send('Room not found');
        }
    } catch (error) {
        console.error('[ERROR] Error in getroomsbyid:', error.message); // Line E
        res.status(500).send('Failed to retrieve room by ID');
    }
};



exports.deleteRoom = async (req, res) => {
    const { room_id } = req.params;

    try {
        const deletedRoom = await deleteroom(room_id);

        if (!deletedRoom) {
            return res.status(404).send('Room not found');
        }

        res.redirect('/rooms');
    } catch (error) {
        console.error('Failed to delete room:', error.message);
        res.status(500).send('Failed to delete room');
    }
};

exports.editRooms = async (req, res) => {
    const room_id = req.params.id;

    try {
        const pool = getpool();
        const result = await pool.query('SELECT * FROM rooms WHERE room_id = $1', [room_id]);

        if (result.rows.length === 0) {
            return res.status(404).send('Room not found');
        }

        res.render('editroom', { room: result.rows[0] }); // Render the editroom.ejs page
    } catch (error) {
        console.error('❌ Error fetching room details:', error.message);
        res.status(500).send('Server error');
    }
};