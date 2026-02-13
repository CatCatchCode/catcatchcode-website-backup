const express = require('express');
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
} = require('../controllers/paymentController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .post(protect, upload.single('screenshot'), createPayment)
    .get(protect, admin, getAllPayments);

router.route('/:id').put(protect, admin, updatePaymentStatus);

module.exports = router;
