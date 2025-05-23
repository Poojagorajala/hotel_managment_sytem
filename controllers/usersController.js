const bcrypt = require('bcryptjs');

const {
    insertUser,
    userLogin,
    getallusers,
    getuserbyid,
    deleteUsers,
    updateusers
} = require('../models/usersQuery');

// Render Add User page
exports.adduserpage = (req, res) => {
    res.render('adduser');
};

// Add new user
exports.adduser = async (req, res) => {
    const { name, email, password, role } = req.body;

    // Basic validations
    const maxLength = 100;
    if (name.length > maxLength) return res.render('adduser', { errorMessage: `Name cannot exceed ${maxLength} characters.` });
    if (email.length > maxLength) return res.render('adduser', { errorMessage: `Email cannot exceed ${maxLength} characters.` });
    if (role.length > maxLength) return res.render('adduser', { errorMessage: `Role cannot exceed ${maxLength} characters.` });
    if (password.length < 6) return res.render('adduser', { errorMessage: 'Password must be at least 6 characters long.' });

    try {
        // insertUser in userQuery.js already hashes password, so pass plain password
        await insertUser(name, email, password, role);
        res.redirect('/users');
    } catch (error) {
        console.error('Error adding user:', error.message);
        let errorMessage = 'Failed to add user.';
        if (error.message.includes('value too long')) {
            errorMessage = 'One or more fields exceed the allowed length in the database.';
        }
        res.render('adduser', { errorMessage });
    }
};

// Get all users page
exports.getalluserpage = async (req, res) => {
    try {
        const users = await getallusers();
        res.render('users', { users });
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('Failed to fetch users');
    }
};

// Render edit user page by id
exports.edituserpage = async (req, res) => {
    const user_id = req.params.user_id;
    try {
        const user = await getuserbyid(user_id);
        if (!user) return res.status(404).send('User not found');
        res.render('edituser', { user });
    } catch (error) {
        console.error('Error loading edit page:', error.message);
        res.status(500).send('Error loading edit page');
    }
};

exports.updateuserdetails = async (req, res) => {
    const { user_id } = req.params;
    const updateFields = req.body;

    // Define max lengths for each field based on your DB schema
    const maxLengths = {
        name: 100,
        email: 100,
        password: 100,
        role: 50
    };

    // Validate field lengths
    for (const field in updateFields) {
        if (updateFields[field] && maxLengths[field] && updateFields[field].length > maxLengths[field]) {
            return res.status(400).send(`${field} exceeds maximum length of ${maxLengths[field]} characters.`);
        }
    }

    try {
        // Hash password if present
        if (updateFields.password) {
            updateFields.password = await bcrypt.hash(updateFields.password, 10);
        }

        console.log('🛠️ Update payload:', updateFields); // Helpful for debugging
        await updateusers(user_id, updateFields);
        res.redirect('/users');
    } catch (error) {
        console.error('Error updating user:', error);  // Log full error object
        res.status(500).send('Failed to update user');
    }
};


// Delete user by id
exports.deleteuser = async (req, res) => {
    const { user_id } = req.params;
    try {
        await deleteUsers(user_id);
        console.log('Deleted user:', user_id);
        res.redirect('/users');
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send('Failed to delete user');
    }
};

// User login handler
exports.userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // userLogin in userQuery.js expects (email, password), but your userQuery's userLogin only needs email to fetch user first
        // So, modify call to userLogin(email) here, then compare passwords here
        const poolUser = await userLogin(email, password); // But your userLogin in userQuery does both lookup + password check

        // Actually, your userQuery's userLogin does password validation and returns user info on success
        // So here just call it, it throws error on failure
        // So just do:
        const user = await userLogin(email, password);

        // Set session after successful login
        req.session.user = {
            id: user.user_id,
            name: user.name,
            role: user.role
        };

        res.redirect('/home');
    } catch (error) {
        console.error('Login error:', error.message);
        if (error.message === 'Invalid email or password') {
            return res.status(401).send('Invalid email or password');
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.showDeleteConfirmation = async (req, res) => {
    const { user_id } = req.params;
    try {
        const pool = getpool();
        const result = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id]);
        const user = result.rows[0];

        res.render('deleteuser', { user });
    } catch (error) {
        console.error('Error fetching user for delete confirmation:', error.message);
        res.status(500).send('Error loading delete confirmation page');
    }
};

