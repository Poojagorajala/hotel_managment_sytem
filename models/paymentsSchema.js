const { getpool } = require('../db');

const createpaymentsTable = async () => {
    try {
        const pool = getpool(); // This line gets the pool
        const query = `
            CREATE TABLE IF NOT EXISTS payments (
                payment_id SERIAL PRIMARY KEY NOT NULL,
                booking_id INTEGER REFERENCES bookings(booking_id),
                amount INTEGER,
                payment_status VARCHAR(50)
            );
        `;
        await pool.query(query);
        console.log('✅ 3.Table payments is created successfully');
    } catch (error) {
        console.error('❌ Error in creating payments table:', error.message);
        throw error; // Re-throw for better error handling
    }
};

module.exports = createpaymentsTable;