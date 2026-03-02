const mongoose = require('mongoose');

const amenitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add amenity name (e.g. Gym, Pool, Parking)'],
        unique: true,
        trim: true
    },
    description: {
        type: String
    },
    icon: {
        type: String, // String identifier for lucide-react icon
        default: 'zap'
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Amenity', amenitySchema);
