const express = require('express');
const path = require('path');
const session = require('express-session');
const { setupDatabase } = require('./db');
const createUserTable = require('./models/usersSchema');
const createroomsTable = require('./models/roomsSchema');
const createpaymentsTable = require('./models/paymentsSchema');
const createhotelsTable = require('./models/hotelsSchema'); // Import hotels table
const createbookingsTable = require('./models/bookingsSchema');

const userRoute = require('./routes/userroute');
const roomsRoute = require('./routes/roomsroute');
const paymentRoute = require('./routes/paymentroute');
const hotelRoute = require('./routes/hotelroute');
const bookingRoute = require('./routes/bookingroute');
const dashboardRoute=require('./routes/dashboardroute');
const app = express();

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));



// Session configuration
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes

app.use('/payments', paymentRoute);
app.use('/bookings', bookingRoute);
app.use('/rooms', roomsRoute);
app.use('/hotels', hotelRoute);
app.use('/users', userRoute);
app.use('/dashboard',dashboardRoute);

// Initialize DB and start server
(async () => {
    try {
        await setupDatabase();
        await createUserTable();
        await createhotelsTable(); // Create hotels table FIRST
        await createroomsTable();  // Then create rooms table
        await createpaymentsTable();
        await createbookingsTable();

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`✅ Server running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ Server startup error:', error.message);
    }
})();