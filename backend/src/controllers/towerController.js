const Tower = require('../models/Tower');

// @desc    Get all towers
// @route   GET /api/towers
// @access  Public
exports.getTowers = async (req, res) => {
    const towers = await Tower.find();
    res.status(200).json({ success: true, count: towers.length, data: towers });
};

// @desc    Get single tower
// @route   GET /api/towers/:id
// @access  Public
exports.getTower = async (req, res) => {
    const tower = await Tower.findById(req.params.id);
    if (!tower) {
        return res.status(404).json({ success: false, error: 'Tower not found' });
    }
    res.status(200).json({ success: true, data: tower });
};

// @desc    Create new tower
// @route   POST /api/towers
// @access  Private/Admin
exports.createTower = async (req, res) => {
    const tower = await Tower.create(req.body);
    res.status(201).json({ success: true, data: tower });
};

// @desc    Update tower
// @route   PUT /api/towers/:id
// @access  Private/Admin
exports.updateTower = async (req, res) => {
    const tower = await Tower.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!tower) {
        return res.status(404).json({ success: false, error: 'Tower not found' });
    }
    res.status(200).json({ success: true, data: tower });
};

// @desc    Delete tower
// @route   DELETE /api/towers/:id
// @access  Private/Admin
exports.deleteTower = async (req, res) => {
    const tower = await Tower.findByIdAndDelete(req.params.id);
    if (!tower) {
        return res.status(404).json({ success: false, error: 'Tower not found' });
    }
    res.status(200).json({ success: true, data: {} });
};
