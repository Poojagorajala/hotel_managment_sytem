const {
    insertrooms,
    updateroom,
    getAvailablerooms,
    getallrooms,
    getroombyHotel
    ,getroombyId
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

exports.updateRooms=async(req,res)=>{
    const {room_id}=req.params;
    const updateFields=req.body;
    try{
        await updateroom(room_id,updateFields);
        res.redirect('/rooms');
    
    }catch(error){
     console.error('error in updating rooms',error.message);
     res.status(500).send('failed to update rooms');
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

exports.getroomsbyid=async(req,res)=>{
  const {room_id}=req.params;
  try{
    const roomid=await getroombyId(room_id);
    res.render('roomid',{roomid});
  }catch(error){
    console.error('error in getting the id',error.message);
    res.status(500).send('failed in the id');
  }
};



   