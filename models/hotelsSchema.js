const { getpool } = require('../db');

const createhotelsTable = async () => {
    try {
        const pool = getpool();
        const query = `
            CREATE TABLE IF NOT EXISTS hotels (
                hotel_id SERIAL PRIMARY KEY,
                name VARCHAR(30) NOT NULL,
                address VARCHAR(40) NOT NULL,
                city VARCHAR(40) NOT NULL
            );
        `;
        await pool.query(query);
        console.log('✅ 4. Table hotels is created successfully');

    } catch (error) {
        console.error('❌ Error in creating hotels table:', error.message);
        throw error; // Re-throw for better error handling
    }
};

module.exports = createhotelsTable;