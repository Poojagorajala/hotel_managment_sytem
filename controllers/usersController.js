const bcrypt = require('bcryptjs');

const {
    insertUser,
    userLogin,
    getallusers,
    getuserbyid,
    deleteUsers
} = require('../models/usersQuery');


exports.adduserpage = (req, res) => {
    res.render('adduser');
};

exports.adduser = async (req, res) => {
    const { name, email, password, role } = req.body;
    // ... (length validations) ...
    try {
        await insertUser(name, email, password, role); 
        res.redirect('/users');
    } catch (error) {
        console.error('Error adding user:', error);
        return res.status(500).send('failed to add user');
    }
};

// exports.adduser = async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Server-side validation for length
//     const maxLength = 100; // You can adjust this value
//     if (name.length > maxLength) {
//         return res.render('adduser', { errorMessage: `Name cannot exceed ${maxLength} characters.` });
//     }
//     if (email.length > maxLength) {
//         return res.render('adduser', { errorMessage: `Email cannot exceed ${maxLength} characters.` });
//     }
//     if (role.length > maxLength) {
//         return res.render('adduser', { errorMessage: `Role cannot exceed ${maxLength} characters.` });
//     }
//     if (password.length < 6) { // Example minimum password length
//         return res.render('adduser', { errorMessage: 'Password must be at least 6 characters long.' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await insertUser(name, email, hashedPassword, role);
//         res.redirect('/'); // Redirect to the user list
//     } catch (error) {
//         console.error('Error adding user:', error);
//         let errorMessage = 'Failed to add user.';
//         if (error.message.includes('value too long')) {
//             errorMessage = 'One or more fields exceed the allowed length in the database.';
//         }
//         return res.render('adduser', { errorMessage });
//     }
// };

exports.getalluserpage = async (req, res) => {
    try {
        const users = await getallusers();
        res.render('users',{users});
    } catch (error) {
        console.error('Error fetching users:', error.message);
        res.status(500).send('failed in users page');
    }
};

// // GET: All users page
// // exports.getalluserpage = async (req, res) => {
// //     try {
// //         const users = await getallusers();
// //         res.render('users', { users });
// //     } catch (error) {
// //         console.error('Error fetching users:', error.message);
// //         res.status(500).send('Failed to fetch users');
// //     }
// // };

// // // GET: Add user form page
// exports.adduserpage = (req, res) => {
//     res.render('adduser');
// };

// // // POST: Add user
// // exports.adduser = async (req, res) => {
// //     const { name, email, password, role } = req.body;
// //     try {
// //         // Hash the password before saving
// //         const hashedPassword = await bcrypt.hash(password, 10);
// //         await insertUser(name, email, hashedPassword, role);
// //         res.redirect('/users');
// //     } catch (error) {
// //         console.error('Error adding user:', error.message);
// //         res.status(500).send('Failed to add user');
// //     }
// // };

// // In your controllers/usersController.js
// exports.adduser = async (req, res) => {
//     const { name, email, password, role } = req.body;
//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);
//         await insertUser(name, email, hashedPassword, role);
//         res.redirect('/users');
//     } catch (error) {
//         console.error('Error adding user:', error.message);
//         // Check for specific database error (e.g., if your query function throws a specific error object)
//         let errorMessage = 'Failed to add user';
//         if (error.message.includes('value too long')) {
//             errorMessage = 'One or more fields have exceeded the maximum allowed length.';
//         }
//         return res.render('adduser', { errorMessage }); // Pass errorMessage to the view
//     }
// };
// // In your controllers/usersController.js
// exports.getalluserpage = async (req, res) => {
//     try {
//         const users = await getallusers();
//         res.render('users', { users, errorMessage: null }); // Pass errorMessage: null
//     } catch (error) {
//         console.error('Error fetching users:', error.message);
//         res.render('users', { users: [], errorMessage: 'Failed to fetch users.' }); // Pass an error message
//     }
// };

// POST: Update user details
// exports.updateuserdetails = async (req, res) => {
//     const { user_id } = req.params;
//     const updateFields = req.body;
//     try {
//         // Hash the password if it's being updated
//         if (updateFields.password) {
//             updateFields.password = await bcrypt.hash(updateFields.password, 10);
//         }
//         await updateusers(user_id, updateFields);
//         res.redirect('/users');
//     } catch (error) {
//         console.error('Error updating user:', error.message);
//         res.status(500).send('Failed to update user');
//     }
// };


// exports.edituserpage = async (req, res) => {
//     const user_id = req.params.user_id;
//     try {
//         const user = await getuserbyid(user_id);
//         res.render('edituser', { user });
//     } catch (error) {
//         res.status(500).send('Error loading edit page');
//     }
// };

// POST: Delete user
exports.deleteuser = async (req, res) => {
    const { user_id } = req.params;
    try {
        await deleteUsers(user_id);
        res.redirect('/users');
        console.log('deleted the users')
    } catch (error) {
        console.error('Error deleting user:', error.message);
        res.status(500).send('Failed to delete user');
    }
};

// POST: User login
exports.userlogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user by email
        const user = await userLogin(email);

        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Compare input password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).send('Invalid email or password');
        }

        // Set session data after successful login
        req.session.user = {
            id: user.user_id,
            name: user.name,
            role: user.role
        };

        res.redirect('/home'); // Or wherever your dashboard/home is
    } catch (error) {
        console.error('Error during login:', error.message);
        // Consider different error responses based on the type of error
        if (error.message === 'Invalid email or password') {
            return res.status(401).send('Invalid email or password');
        }
        res.status(500).send('Internal Server Error');
    }
};

exports.edituserpage = async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const user = await getuserbyid(user_id);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.render('edituser', { user });
        console.log('edited the user')
    } catch (error) {
        console.error('Error loading edit page:', error.message);
        res.status(500).send('Error loading edit page');
    }
};
