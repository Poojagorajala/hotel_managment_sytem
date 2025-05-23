const {getpool} = require('../db');

const insertHotel=async(name,address,city)=>{
    try{
        const pool=getpool();
        const query=`
        insert into hotels(name,address,city) values ($1,$2,$3)
        returning *`;
        const result=await pool.query(query,[name,address,city]);
        console.log(result);
        // return result.rows[0];
    }
    catch(error){
        console.error('error in inserting the hotels values',error.message);
        throw error;
    }
}

const getallhotels=async()=>{
    try{
        const pool=getpool();
        const query=`
        select * from hotels`;
        const result=await pool.query(query);
        console.log(result);
        return result.rows;
    }catch(error){
        console.error('error in getting the hotels',error.message);
        throw error;
    }
}

const updatehotel = async (hotel_id, name, address, city) => {
    try {
        const pool = getpool();
        const query = `
            UPDATE hotels
            SET name = $1,
                address = $2,
                city = $3
            WHERE hotel_id = $4
            RETURNING *`;
        const result = await pool.query(query, [name, address, city, hotel_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in updating the hotel', error.message);
        throw error;
    }
};



const deletehotel=async(hotel_id)=>{
    try{
     const pool=getpool();
     const query=
     `delete from hotels where hotel_id=$1 returning *`;
     const result=await pool.query(query,[hotel_id]);
     console.log(result);
    //  return result.rows[0];
    } catch(error){
        console.error('error in deleting the hotels',error.message);
        throw error;
    }
}

const gethotelbyid=async(hotel_id)=>{
    try{
        const pool=getpool();
        const query=
        `select * from hotels where hotel_id = $1`;
        const result=await pool.query(query,[hotel_id]);
        console.log(result);
        return result.rows[0];
    } catch(error){
        console.error ('error in getting the hotel by id',error.message);
    }
}

const edithotel = async (req, res) => {
    try {
        const hotel_id = req.params.hotel_id;
        const hotel = await hotelQuery.gethotelbyid(hotel_id);
        if (!hotel) {
            return res.status(404).send('Hotel not found');
        }
        res.render('edithotel', { hotel });
    } catch (error) {
        console.error('Error showing hotel edit form:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports={insertHotel,getallhotels,deletehotel,updatehotel,gethotelbyid,edithotel};