const { getpool } = require('../db');

const createUserTable = async () => {
    try {
        const pool = getpool();
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                user_id serial PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(100) NOT NULL,
                role VARCHAR(50)
            );
        `;  // <-- closing backtick added here

        await pool.query(query);
        console.log('✅1. the users table is created');
    } catch (error) {
        console.log('there is error in table creation', error.message);
    }
};

module.exports = createUserTable;
