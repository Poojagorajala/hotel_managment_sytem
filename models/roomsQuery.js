const {getpool}=require('../db');

const insertrooms=async(hotel_id,room_type,price,availability)=>{
    try{
        const pool=getpool();
        const query=`
        insert into rooms(hotel_id,room_type,price,availability) values ($1,$2,$3,$4)
        returning *`;
        const result=await pool.query(query,[hotel_id,room_type,price,availability]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('the error in inserting the rooms',error.message);
        throw error;
    }
}

const getallrooms=async()=>{
    try{
        const pool=getpool();
        const query=`
        select * from rooms`;
        const result=await pool.query(query);
        console.log(result);
        return result.rows;
    }catch(error){
        console.error('the error in getting all rooms',error.message);
        throw error;
    }
}

const getroombyHotel=async(hotel_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from rooms where hotel_id=$1`;
        const result=await pool.query(query,[hotel_id]);
        console.log(result);

         if(result.rows.length === 0){
            throw new error ('hotel not found');
        }
        return result.rows;
    }catch(error){
        console.error('error in getting hotel',error.message);
        throw error
    }
}

const getAvailablerooms=async(availability)=>{
    try{
        const pool=getpool();
        const query=`
        select * from rooms where availability=$1`;
        const result=await pool.query(query,[availability]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in availabaility in the rooms',error.message);
        throw error;
    }
}

const getroombyId=async(room_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from rooms where room_id =$1`;
        const result=await pool.query(query,[room_id]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in getting single room',error.message);
        throw error;
    }
}


const updateroom = async(hotel_id, room_type, price, availability, room_id) => {
    try {
        const pool = getpool();
        const query = `
            UPDATE rooms
            SET hotel_id = $1,
                room_type = $2,
                price = $3,
                availability = $4
            WHERE room_id = $5
            RETURNING *;
        `;
        
        const result = await pool.query(query, [hotel_id, room_type, price, availability, room_id]);
        console.log(result);
        return result.rows[0]; // Returning the updated room details
    } catch (error) {
        console.error('Error in updating the room:', error.message);
        throw error;
    }
}

const deleteroom = async (room_id) => {
    try {
        const pool = getpool();
        const query = `DELETE FROM rooms WHERE room_id = $1 RETURNING *`;
        const result = await pool.query(query, [room_id]);
        console.log(result); // ✅ will show success/failure
        return result.rows[0]; // important: return deleted row
    } catch (error) {
        console.error('Error deleting room:', error.message);
        throw error;
    }
};

const editRooms = async (req, res) => {
  const roomId = req.params.room_id;
  try {
    const pool=getpool();

    const result = await pool.query('SELECT * FROM rooms WHERE room_id = $1', [roomId]);
    if (result.rows.length === 0) {
      return res.status(404).send('Room not found');
    }
    const room = result.rows[0];
    res.render('editRoom', { room });  // make sure the template 'editRoom' receives 'room'
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};




module.exports={insertrooms,editRooms,updateroom,getAvailablerooms,getallrooms,getroombyHotel,getroombyId,deleteroom};