const mongoose = require('mongoose');

const towerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a tower name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    floors: {
        type: Number,
        required: [true, 'Please add number of floors']
    },
    description: {
        type: String,
        maxlength: [500, 'Description can not be more than 500 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tower', towerSchema);
