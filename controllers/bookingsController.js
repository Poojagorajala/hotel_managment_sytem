const { insertbooking,
    getbookingsbyuser,
    getbookingsbyroom,
    getbookingsbyhotel,
    getbookingbyid,
    getallbooking,
    getBookingsByStatus,
    deleteBooking,
    updateBooking}=require('../models/bookingQuery');

    exports.addbooking=async(req,res)=>{
       res.render('addbookings');
    }

    exports.addbookings=async(req,res)=>{
        const {user_id,room_id,checkin_date,checkout_date} = req.body;
        try{
          await insertbooking(user_id,room_id,checkin_date,checkout_date);
          res.redirect('/bookings');
        }catch(error){
            console.error('error in booking',error.message);
            res.status(500).send('failed in booking');
        }
    };

    exports.getbookingbyUser=async(req,res)=>{
        const {user_id}=req.params;
        try{
            const bookinguser=await getbookingsbyuser(user_id);
            res.render('bookinguser',{bookinguser});
        }catch(error){
            console.error('error in getting booking by user',error.message);
            res.status(500).send('failed in getting by user booking');
        }
    };

    exports.getbookingbyRoom=async(req,res)=>{
        const {room_id}=req.params;
        try{
            const bookingroom = await getbookingsbyroom(room_id);
            res.render('bookingRoom',{bookingroom});
        }catch(error){
            console.error('error in getting the booking room',error.message);
            res.status(500).send('faied in booking room');
        }
    }

    exports.getbookingbyHotel=async(req,res)=>{
        const{hotel_id}=req.params;
        try{
            const bookinghotel=await getbookingsbyhotel(hotel_id);
            res.render('bookinghotel',{bookinghotel});
        }catch(error){
            console.error('error in booking hotel',error.message);
            res.status(500).send('failed in booking hotel');
        }
    };

    exports.getbookingbyId=async(req,res)=>{
        const {booking_id}=req.params;
        try{
            const bookingid=await getbookingbyid(booking_id);
            res.render('bookingid',{bookingid});
        }catch(error){
            console.error('error in booking through id');
            res.status(500).send('failed in booking through id');
        }
    };

    exports.getallbookings=async(req,res)=>{
        try{
           const bookingsall= await getallbooking();
           res.render('bookingsall',{bookingsall});

        }catch(error){
            console.error('error in getting all books',error.message);
            res.status(500).send('failed in getting booking');
        }
    };

    exports.getbookingbystatus=async(req,res)=>{
        const {status}=req.params;
        try{
            const bookinguser=await getBookingsByStatus(status);
            res.render('bookinguser',{bookinguser});
        }catch(error){
            console.error('error in booking by status',error.message);
            res.status(500).send('failed at booking through status');
        }
    };

    exports.deletebooking=async(req,res)=>{
        const{booking_id}=req.params;
        try{
            const bookings=await deleteBooking(booking_id);
            res.render('bookings',{bookings});
        }catch(error){
            console.error('error in deleting user',error.message);
            res.status(500).send('failed at deleting');
        }
    };

  exports.updatebookings = async (req, res) => {
    const { booking_id } = req.params;
    const updateFields = req.body;
    try {
        await updateBooking(booking_id, updateFields);
        res.redirect('/bookings');
    } catch (error) {
        console.error('Error in updating booking:', error.message);
        res.status(500).send('Failed to update booking');
    }
};


