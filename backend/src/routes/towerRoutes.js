const express = require('express');
const {
    getTowers,
    getTower,
    createTower,
    updateTower,
    deleteTower
} = require('../controllers/towerController');

const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router
    .route('/')
    .get(getTowers)
    .post(protect, authorize('admin'), createTower);

router
    .route('/:id')
    .get(getTower)
    .put(protect, authorize('admin'), updateTower)
    .delete(protect, authorize('admin'), deleteTower);

module.exports = router;
