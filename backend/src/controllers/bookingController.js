const Booking = require('../models/Booking');
const Flat = require('../models/Flat');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
    let query;

    // If normal user, only get their own bookings
    if (req.user.role !== 'admin') {
        query = Booking.find({ user: req.user.id }).populate({
            path: 'flat',
            select: 'flatNumber tower rent',
            populate: { path: 'tower', select: 'name' }
        });
    } else {
        // If admin, get all bookings
        query = Booking.find().populate({
            path: 'flat',
            select: 'flatNumber tower rent',
            populate: { path: 'tower', select: 'name' }
        }).populate({
            path: 'user',
            select: 'name email'
        });
    }

    const bookings = await query;
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
};

// @desc    Request a booking
// @route   POST /api/bookings
// @access  Private (User)
exports.createBooking = async (req, res) => {
    req.body.user = req.user.id;

    const flat = await Flat.findById(req.body.flat);
    if (!flat) return res.status(404).json({ success: false, error: 'Flat not found' });
    if (flat.status !== 'Available') return res.status(400).json({ success: false, error: 'Flat is not available' });

    // Check if already requested
    const existingBooking = await Booking.findOne({ user: req.user.id, flat: req.body.flat, status: 'Pending' });
    if (existingBooking) return res.status(400).json({ success: false, error: 'You already requested this flat' });

    const booking = await Booking.create(req.body);

    // Optional: Change flat status to strictly booked? Or wait for admin approval. Let's wait for admin approval.
    res.status(201).json({ success: true, data: booking });
};

// @desc    Update booking status (Approve/Reject)
// @route   PUT /api/bookings/:id
// @access  Private (Admin)
exports.updateBooking = async (req, res) => {
    let booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ success: false, error: 'Booking not found' });

    booking = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    // If approved, update Flat status to Occupied/Booked
    if (req.body.status === 'Approved') {
        await Flat.findByIdAndUpdate(booking.flat, { status: 'Booked' });
    } else if (req.body.status === 'Rejected' || req.body.status === 'Cancelled') {
        await Flat.findByIdAndUpdate(booking.flat, { status: 'Available' });
    }

    res.status(200).json({ success: true, data: booking });
};
