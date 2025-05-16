const {getpool}= require('../db');

const insertbooking=async(user_id,room_id,status,checkin_date,checkout_date)=>{
    try{
        const pool=getpool();
        const query=`
        insert into bookings(user_id,room_id,status,checkin_date,checkout_date) values ($1,$2,$3,$4,$5) returning *`;
        const result=await pool.query(query,[user_id,room_id,status,checkin_date,checkout_date]);
        console.log(result);
        return result.rows;
    } catch(error){
        console.error('error in inserting values',error.message);
        throw error;
    }
}

const getallbooking=async()=>{
    try{
        const pool=getpool();
        const query=`
          select * from bookings;`
         const result=await pool.query(query);
         console.log(result);
         return result.rows;
    }catch(error){
        console.error('error in getting the books',error.message);
        throw error;
    }
}

const getbookingbyid=async(booking_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from bookings where booking_id = $1`;
        const result=await pool.query(query,[booking_id]);
        console.log(error);
        return result.rows[0];
    
    }catch(error){
        console.error('error in getting and booking by id',error.message);
        throw error;
    }
}

const getbookingsbyuser=async(user_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from bookings where user_id=$1`;
        const result=await pool.query(query,[user_id]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in getting user ',error.message);
        throw error;
    }
}

const getbookingsbyhotel=async(hotel_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from bookings where hotel_id=$1`;
        const result=await pool.query(query,[hotel_id]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in accessing the hotel by booking',error.message);
        throw error;
    }
}

const getbookingsbyroom=async(room_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from bookings where room_id=$1`;
        const result=await pool.query(query,[room_id]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in getting the room',error.message);
        throw error;
    }
}

const getBookingsByStatus = async (status) => {
  try {
    const pool = getpool();
    const query = `SELECT * FROM bookings WHERE status = $1`;
    const result = await pool.query(query, [status]);
    return result.rows;
  } catch (error) {
    console.error('Error getting bookings by status:', error.message);
    throw error;
  }
};

const updateBooking = async (booking_id, room_id, status,check_in, check_out) => {
  try {
    const pool = getpool();
    const query = `
      UPDATE bookings
      SET room_id = $1,
          check_in = $2,
          check_out = $3,
          status = $4
      WHERE booking_id = $5
      RETURNING *`;
    const result = await pool.query(query, [room_id, check_in, status,check_out, booking_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating booking:', error.message);
    throw error;
  }
};

const deleteBooking = async (booking_id) => {
  try {
    const pool = getpool();
    const query = `DELETE FROM bookings WHERE booking_id = $1 RETURNING *`;
    const result = await pool.query(query, [booking_id]);
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting booking:', error.message);
    throw error;
  }
};

module.exports={insertbooking,getbookingsbyuser,getbookingsbyroom,getbookingsbyhotel,getbookingbyid,getallbooking,getBookingsByStatus,deleteBooking,updateBooking};

