const express = require('express');
const router = express.Router();
const PaymentsController = require('../controllers/paymentsController');

// GET: Render add payment form
router.get('/payments/add', PaymentsController.addpayment);

// POST: Add a new payment
router.post('/payments/add', PaymentsController.newpayments);

// GET: All payments
router.get('/payments', PaymentsController.getallpayments);

// GET: Get payments by status
router.get('/payments/status/:payment_status', PaymentsController.getpaymentbystatus);

// GET: Get payment by booking ID
router.get('/payments/booking/:booking_id', PaymentsController.getpaymentBybooking);

// GET: Get payment by payment ID
router.get('/payments/:payment_id', PaymentsController.getpaymentbyId);

// POST: Update payment
router.post('/payments/:payment_id/update', PaymentsController.updatePayment);

// POST: Delete payment
router.post('/payments/:payment_id/delete', PaymentsController.deletepayment);

module.exports = router;


