const Amenity = require('../models/Amenity');

// @desc    Get all amenities
// @route   GET /api/amenities
// @access  Public
exports.getAmenities = async (req, res) => {
    const amenities = await Amenity.find({ isActive: true });
    res.status(200).json({ success: true, count: amenities.length, data: amenities });
};

// @desc    Create new amenity
// @route   POST /api/amenities
// @access  Private/Admin
exports.createAmenity = async (req, res) => {
    const amenity = await Amenity.create(req.body);
    res.status(201).json({ success: true, data: amenity });
};

// @desc    Update amenity
// @route   PUT /api/amenities/:id
// @access  Private/Admin
exports.updateAmenity = async (req, res) => {
    const amenity = await Amenity.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!amenity) {
        return res.status(404).json({ success: false, error: 'Amenity not found' });
    }
    res.status(200).json({ success: true, data: amenity });
};

// @desc    Delete amenity
// @route   DELETE /api/amenities/:id
// @access  Private/Admin
exports.deleteAmenity = async (req, res) => {
    const amenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!amenity) {
        return res.status(404).json({ success: false, error: 'Amenity not found' });
    }
    res.status(200).json({ success: true, data: {} });
};
