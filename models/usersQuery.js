const { getpool } = require('../db');
const bcrypt = require('bcryptjs'); // Corrected import


const insertUser = async (name, email, password, role) => {
    try {
        const pool = getpool();

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('adding the users details'); // ADD THIS LINE
        const query = `
            INSERT INTO users(name, email, password, role)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const result = await pool.query(query, [name, email,password, role]);
        console.log('User inserted:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in inserting user values:', error.message);
        throw error;
    }
};

const userLogin = async (email, password) => {
    try {
        const pool = getpool();
        const query = `
            SELECT *
            FROM users
            WHERE email = $1`;
        const result = await pool.query(query, [email]);
        const user = result.rows[0];

        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        return {
            user_id: user.user_id,
            name: user.name,
            role: user.role,
        };
    } catch (error) {
        console.error('Error in user login:', error.message);
        throw error; // Re-throw for better error handling
    }
};

const getallusers = async () => {
    try {
        const pool = getpool();
        const query = `
            SELECT *
            FROM users`;
        const result = await pool.query(query);
        console.log('All users:', result.rows);
        return result.rows;
    } catch (error) {
        console.error('Error in getting user values:', error.message);
        throw error;
    }
};

const updateusers = async (user_id, updateFields) => {
    try {
        const pool = getpool();
        let query = 'UPDATE users SET ';
        const values = [];
        let index = 1;

        for (const key in updateFields) {
            if (updateFields.hasOwnProperty(key)) {
                if (key === 'password') {
                    const hashedPassword = await bcrypt.hash(updateFields[key], 10);
                    query += `${key} = $${index++}, `;
                    values.push(hashedPassword);
                } else {
                    query += `${key} = $${index++}, `;
                    values.push(updateFields[key]);
                }
            }
        }

        query = query.slice(0, -2); // Remove the trailing ', '
        query += ` WHERE user_id = $${index} RETURNING *;`;
        values.push(user_id);

        const result = await pool.query(query, values);
        console.log('User updated:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in updating users table:', error.message);
        throw error;
    }
};


const getuserbyid = async (user_id) => {
    try {
        const pool = getpool();
        const query = `SELECT * FROM users WHERE user_id = $1`;
        const result = await pool.query(query, [user_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by ID:', error.message);
        throw error;
    }
};


const deleteUsers = async (user_id) => {
    try {
        const pool = getpool();
        const query = `
            DELETE FROM users
            WHERE user_id = $1
            RETURNING *`;
        const result = await pool.query(query, [user_id]);
        console.log('User deleted:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in deleting the users:', error.message);
        throw error;
    }
};

module.exports = { insertUser, userLogin, getallusers, getuserbyid, deleteUsers,updateusers };