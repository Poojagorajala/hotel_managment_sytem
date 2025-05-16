const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// Global variable for the pool
let pool;

// Setup the database
const setupDatabase = async () => {
    // Step 1: Connect to 'postgres' to create 'hotelmanagedb'
    const client = new Client({
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        database: 'postgres'
    });

    try {
        await client.connect();
        await client.query('CREATE DATABASE hotelmanagedb');
        console.log('✅ Database "hotelmanagedb" created');
    } catch (err) {
        if (err.code === '42P04') {
            console.log('ℹ️  Database "hotelmanagedb" already exists');
        } else {
            console.error('❌ Error creating database:', err.message);
        }
    } finally {
        await client.end();
    }

    // Step 2: Initialize pool with 'hotelmanagedb' after creation
    pool = new Pool({ // Corrected: Use Pool constructor
        user: process.env.DATABASE_USER,
        host: process.env.DATABASE_HOST,
        database: 'hotelmanagedb',
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT,
        max: 20, // Maximum number of clients in the pool
        idleTimeoutMillis: 60000, // Idle timeout
        connectionTimeoutMillis: 50000, // Connection timeout
        keepAlive: true,
    });

    try {
        await pool.query('SELECT NOW()');
        console.log('✅ Connected to "hotelmanagedb"!');
    } catch (err) {
        console.error('❌ Failed to connect to "hotelmanagedb":', err.message);
    }
};

// Get the pool to interact with the database
const getpool = () => {
    if (!pool) {
        throw new Error('❌ Pool is not initialized. Call setupDatabase() first.');
    }
    return pool;
};

module.exports = {
    setupDatabase,
    getpool
};