const express = require('express');
const {
    getFlats,
    getFlat,
    createFlat,
    updateFlat,
    deleteFlat
} = require('../controllers/flatController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getFlats)
    .post(protect, authorize('admin'), createFlat);

router
    .route('/:id')
    .get(getFlat)
    .put(protect, authorize('admin'), updateFlat)
    .delete(protect, authorize('admin'), deleteFlat);

module.exports = router;
