const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getAllUsers,
  updateUserBlockStatus
} = require('../controllers/adminController');
const { exportData } = require('../controllers/reportController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getDashboardStats);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id/block', protect, admin, updateUserBlockStatus);
router.get('/export/:type', protect, admin, exportData);

module.exports = router;
