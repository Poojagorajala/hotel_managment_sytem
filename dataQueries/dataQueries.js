// dataQueries.js
const { Pool } = require('pg');  // Import pg package for PostgreSQL connection
// const { getallbookings } = require('../controllers/bookingsController');

// Set up a connection pool to PostgreSQL
const pool = new Pool({
  user: 'postgres',     // Replace with your database user
  host: 'localhost',
  database: 'hotelmanagedb', // Replace with your database name
  password: 'pooja', // Replace with your database password
  port: 5432, // Default PostgreSQL port
});


const getAllHotels = async () => {
  try {
    const result = await pool.query('SELECT * FROM hotels');
    return result.rows; // Returning the rows as an array of objects
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};

const getAllBooking = async () => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows; // Returning the rows as an array of objects
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error; // Re-throw the error to be caught by the controller
  }
};


const getAllpayments = async () => {
  try {
    const result = await pool.query('SELECT * FROM payments');
    return result.rows;
  } catch (error) {
    console.error('Error fetching medicines:', error);
    throw error;
  }
};


const getAllrooms= async () => {
  try {
    const result = await pool.query('SELECT * FROM rooms');
    return result.rows;
  } catch (error) {
    console.error('Error fetching prescriptions:', error);
    throw error;
  }
};


const getAllUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Export the functions for use in controllers
module.exports = {
  getAllHotels,
  getAllpayments,
  getAllrooms,
  getAllUsers,
  getAllBooking,
};
