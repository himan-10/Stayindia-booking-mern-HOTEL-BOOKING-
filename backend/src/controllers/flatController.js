const Flat = require('../models/Flat');

// @desc    Get all flats
// @route   GET /api/flats
// @access  Public
exports.getFlats = async (req, res) => {
    let query;

    const reqQuery = { ...req.query };
    const removeFields = ['select', 'sort', 'page', 'limit'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Flat.find(JSON.parse(queryStr)).populate('tower', 'name');

    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    const flats = await query;
    res.status(200).json({ success: true, count: flats.length, data: flats });
};

// @desc    Get single flat
// @route   GET /api/flats/:id
// @access  Public
exports.getFlat = async (req, res) => {
    const flat = await Flat.findById(req.params.id).populate('tower', 'name description');
    if (!flat) {
        return res.status(404).json({ success: false, error: 'Flat not found' });
    }
    res.status(200).json({ success: true, data: flat });
};

// @desc    Create new flat
// @route   POST /api/flats
// @access  Private/Admin
exports.createFlat = async (req, res) => {
    const flat = await Flat.create(req.body);
    res.status(201).json({ success: true, data: flat });
};

// @desc    Update flat
// @route   PUT /api/flats/:id
// @access  Private/Admin
exports.updateFlat = async (req, res) => {
    const flat = await Flat.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!flat) {
        return res.status(404).json({ success: false, error: 'Flat not found' });
    }
    res.status(200).json({ success: true, data: flat });
};

// @desc    Delete flat
// @route   DELETE /api/flats/:id
// @access  Private/Admin
exports.deleteFlat = async (req, res) => {
    const flat = await Flat.findByIdAndDelete(req.params.id);
    if (!flat) {
        return res.status(404).json({ success: false, error: 'Flat not found' });
    }
    res.status(200).json({ success: true, data: {} });
};
