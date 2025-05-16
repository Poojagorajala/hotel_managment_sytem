const { getpool } = require('../db');

const createUserTable = async () => {
    try {
        const pool = getpool();
        const query = `
            CREATE table if not exists users(
                user_id serial primary key,
                name varchar(100) not null,
                email varchar(100) not null,
                password varchar(100),
                role varchar(30));`;
        await pool.query(query);
        console.log('✅1. the users table is created');
    } catch (error) {
        console.log('there is error in table creation', error.message);
    }
}

module.exports = createUserTable;