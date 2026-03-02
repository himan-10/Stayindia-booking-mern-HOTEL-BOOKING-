const express = require('express');
const {
    getAmenities,
    createAmenity,
    updateAmenity,
    deleteAmenity
} = require('../controllers/amenityController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getAmenities)
    .post(protect, authorize('admin'), createAmenity);

router
    .route('/:id')
    .put(protect, authorize('admin'), updateAmenity)
    .delete(protect, authorize('admin'), deleteAmenity);

module.exports = router;
