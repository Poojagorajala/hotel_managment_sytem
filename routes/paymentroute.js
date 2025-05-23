const express = require('express');
const router = express.Router();
const PaymentsController = require('../controllers/paymentsController');

// GET: Render add payment form
router.get('/add', PaymentsController.addpayment);

// POST: Add a new payment
router.post('/add', PaymentsController.newpayments);

// GET: All payments
router.get('/', PaymentsController.getallpayments);

// GET: Get payments by status
router.get('/status/:payment_status', PaymentsController.getpaymentbystatus);

// GET: Get payment by booking ID
router.get('/booking/:booking_id', PaymentsController.getpaymentBybooking);

// GET: Get payment by payment ID
router.get('/:payment_id', PaymentsController.getpaymentbyId);

// POST: Update payment
router.post('/:payment_id/update', PaymentsController.updatePayment);

// POST: Delete payment
router.post('/:payment_id/delete', PaymentsController.deletepayment);

module.exports = router;


