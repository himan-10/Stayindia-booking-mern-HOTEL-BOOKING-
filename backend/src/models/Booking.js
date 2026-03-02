const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    flat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Flat',
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Cancelled'],
        default: 'Pending'
    },
    moveInDate: {
        type: Date,
        required: [true, 'Please specify moving date']
    },
    notes: {
        type: String
    },
    adminReply: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure user can't double book same flat in a pending state
bookingSchema.index({ user: 1, flat: 1, status: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
