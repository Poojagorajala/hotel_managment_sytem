const {
insertpayment,
getPaymentbystatus,
getallpayments,
getpaymentbybooking,
getpaymentbyid,
updatepayment,
deletePayment
}=require('../models/paymentsQuery');

exports.addpayment=async(req,res)=>{
    res.render('addpayments');
}

exports.newpayments=async(req,res)=>{
    const { booking_id,amount,payment_status}=req.body;
    try{
        const addpayments=await insertpayment(booking_id,amount,payment_status);
        res.redirect('/payments');
    }catch(error){
        console.error('error in adding payments',error.message);
        res.status(500).send('failed to add payments');
    }
};

exports.getpaymentbystatus=async(req,res)=>{
    const {payment_status}=req.params;
    try{
        const payments=await getPaymentbystatus(payment_status);
        res.render('payments',{payments});
    }catch(error){
        console.error('error in getting the status of the payment',error.message);
        res.status(500).send('failed in getting status')
    }
};

exports.getallpayments=async(req,res)=>{
    try{
        const paymentsall=await getallpayments();
        res.render('paymentsall',{paymentsall});
    }catch(error){
        console.error('error in payments',error.message);
        res.status(500).send('failed to get all payments');
    }
};

exports.getpaymentBybooking=async(req,res)=>{
    const {booking_id}=req.params;
    try{
        const paymentbooking=await getpaymentbybooking(booking_id);
        res.render('paymentbooking',{paymentbooking});
    }catch(error){
        console.error('error in payment by booking',error.message);
        res.status(500).send('failed booking');
    }
};

exports.getpaymentbyId=async(req,res)=>{
    const {payment_id}=req.params;
    try{
        const paymentid=await getpaymentbyid(payment_id);
        res.render('paymentid',{paymentid});
    }catch(error){
        console.error('error in getting the payment by id',error.message);
        res.status(500).send('failed in payment id');
    }
};

exports.updatePayment=async(req,res)=>{
    const {payment_id}=req.params;
    const updateFields=req.body;
    try{
        await updatepayment(payment_id,updateFields);
        res.redirect('/payments');
    }catch(error){
        console.error('error in updating payments',error.message);
        res.status(500).send('failed in update');
    }
}

exports.deletepayment=async(req,res)=>{
    const {payment_id}=req.params;
    try{
        await deletePayment(payment_id);
        res.redirect('/payments');
    }catch(error){
        console.error('error in deleting payments',error.message);
        res.status(500).send('failed to delete');
    }
};




