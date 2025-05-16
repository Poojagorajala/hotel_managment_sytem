const { getpool } = require('../db');

const createbookingsTable = async () => {
    try {
        const pool = getpool();
        const query = `
            CREATE TABLE IF NOT EXISTS bookings (
                booking_id SERIAL PRIMARY KEY,

                user_id INTEGER REFERENCES users(user_id),
                room_id INTEGER REFERENCES rooms(room_id),
                hotel_id INTEGER REFERENCES hotels(hotel_id),
                checkin_date DATE NOT NULL,
                checkout_date DATE NOT NULL,
                booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                status VARCHAR(30) DEFAULT 'pending'
            );
        `;
        await pool.query(query);
        console.log('✅  5. Table for bookings is created');
    } catch (error) {
        console.error('❌ Error in creating bookings table:', error.message);
        throw error;
    }
};

module.exports = createbookingsTable;