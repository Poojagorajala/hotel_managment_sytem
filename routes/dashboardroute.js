// routes/dashboardRoute.js

const express = require('express');
const router = express.Router();
const dashboardcontroller = require('../controllers/dashboardController');

// GET /dashboard - Render the dashboard page
router.get('/', dashboardcontroller.getDashboardPage);

module.exports = router;
