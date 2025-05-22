// controllers/dashboardController.js
const {
  getAllHotels,
  getAllpayments,
  getAllrooms,
  getAllUsers,
  getAllBooking,
} = require('../dataQueries/dataQueries'); // Adjust path if needed

exports.getDashboardPage = async (req, res) => {
  try {
    // Fetch all data
    const hotels = await getAllHotels();
    const payments = await getAllpayments();
    const rooms = await getAllrooms();
    const users = await getAllUsers();
    const bookings = await getAllBooking();

    // Calculate totals
    const totalHotels = hotels.length;
    const totalPayments = payments.length;
    const totalRooms = rooms.length;
    const totalUsers = users.length;
    const totalBookings = bookings.length;

    // Render the dashboard view
    res.render('dashboard', {
      totalHotels,
      totalPayments,
      totalRooms,
      totalUsers,
      totalBookings,

      recentBookings: bookings.slice(0, 5), // ✅ Correctly added
      hotels: hotels.slice(0, 5),
      payments: payments.slice(0, 5),
      rooms: rooms.slice(0, 5),
      users: users.slice(0, 5),

        adminName: 'Admin'
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({
      message: 'Failed to fetch dashboard data',
      error: error.message
    });
  }
};
