const {getpool}=require('../db');

const insertpayment=async(booking_id,amount,payment_status)=>{
    try{
        const pool=getpool();
        const query=`
        insert into payments(booking_id,amount,payment_status) values ($1,$2,$3);`
        const result=await pool.query(query,[booking_id,amount,payment_status]);
        console.log(result);
        return result.rows[0];
    }
    catch(error){
        console.error('there is error in payments insertion',error.message);
        throw error;
    }

}

const getallpayments=async()=>{
    try{
        const pool=getpool();
        const query=`
        select * from payments;`
        const result=await pool.query(query);
        console.log(result);
        return result.rows;
    }catch(error){
        console.error('error in getting the paymnets',error.message);
        throw error;
    }
}

const getpaymentbybooking=async(booking_id)=>{
    try{
        const pool=getpool();
        const query=`
        select * from payments where booking_id=$1`;
        const result=await pool.query(query,[booking_id]);
        console.log(result);
        return result.rows;
    }catch(error){
        console.error('error in getting payment by booking',error.message);
        throw error;
    }
}

const getpaymentbyid=async(payment_id)=>{
    try{
        const pool=getpool();
        const query=
        `select * from payments where payment_id=$1
        `;
        const result=await pool.query(query,[payment_id]);
        console.log(result);
        return result.rows[0];
    }catch(error){
        console.error('error in getting the payment by id',error.message);
        throw error;
  }
}


const getPaymentbystatus=async(payment_status)=>{
    try{
        const pool=getpool();
        const query=`
        select * from payments where payment_status=$1`;
        const result=await pool.query(query,[payment_status]);
        console.log(result);
        return result.rows;
    }catch(error){
        console.error('error in getting payment status',error.message);
        throw error
    }
}

const updatepayment = async (booking_id, amount, payment_status, payment_id) => {
    try {
        const pool = getpool();
        const query = `
            UPDATE payments
            SET booking_id = $1,
                amount = $2,
                payment_status = $3
            WHERE payment_id = $4
            RETURNING *;
        `;
        const result = await pool.query(query, [booking_id, amount, payment_status, payment_id]);
        console.log(result);
        return result.rows[0];
    } catch (error) {
        console.error('Error in updating the payments', error.message);
        throw error;
    }
};


const deletePayment=async(payment_id)=>{
 try{
    const pool=getpool();
    const query=`
    delete  from payments where payment_id=$1
    returning *`;
    const result=await pool.query(query,[payment_id]);
    console.log(result);
    return result.rows[0];
 }catch(error){
    console.error('error in deleting the payments',error.message);
    throw error
 }
}

module.exports={insertpayment,getPaymentbystatus,getallpayments,getpaymentbybooking,getpaymentbyid,updatepayment,deletePayment};
