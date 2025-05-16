const { getpool } = require('../db');

const createroomsTable = async () => {
    try {
        const pool = getpool();
        const query = `
            CREATE TABLE IF NOT EXISTS rooms (
                room_id SERIAL PRIMARY KEY,
                hotel_id INTEGER REFERENCES hotels(hotel_id),
                room_type VARCHAR(30),
                price VARCHAR(40),
                availability BOOLEAN DEFAULT TRUE
            );
        `;
        await pool.query(query);
        console.log('✅  2.Table for rooms is created');
    } catch (error) {
        console.error('❌ Error in creating rooms table:', error.message);
        throw error;
    }
};

module.exports = createroomsTable;