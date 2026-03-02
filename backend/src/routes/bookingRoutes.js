const express = require('express');
const {
    getBookings,
    createBooking,
    updateBooking
} = require('../controllers/bookingController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(protect, getBookings)
    .post(protect, authorize('user'), createBooking);

router
    .route('/:id')
    .put(protect, authorize('admin'), updateBooking);

module.exports = router;
