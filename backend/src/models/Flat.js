const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
    flatNumber: {
        type: String,
        required: [true, 'Please add a flat number'],
        trim: true
    },
    tower: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tower',
        required: true
    },
    bhk: {
        type: String,
        enum: ['1BHK', '2BHK', '3BHK', '4BHK', 'Penthouse'],
        required: [true, 'Please select BHK type']
    },
    rent: {
        type: Number,
        required: [true, 'Please add monthly rent amount']
    },
    deposit: {
        type: Number,
        required: [true, 'Please add deposit amount']
    },
    status: {
        type: String,
        enum: ['Available', 'Booked', 'Occupied', 'Maintenance'],
        default: 'Available'
    },
    areaSquareFeet: {
        type: Number,
        required: [true, 'Please add area in square feet']
    },
    furnishedStatus: {
        type: String,
        enum: ['Unfurnished', 'Semi-Furnished', 'Fully-Furnished'],
        default: 'Unfurnished'
    },
    images: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create compound index for flatNumber in a tower to ensure uniqueness
flatSchema.index({ tower: 1, flatNumber: 1 }, { unique: true });

module.exports = mongoose.model('Flat', flatSchema);
