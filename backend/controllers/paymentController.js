const Payment = require('../models/Payment');
const User = require('../models/User');
const Course = require('../models/Course');
const { uploadToCloudinary } = require('../utils/cloudinaryHelper');
const sendEmail = require('../utils/sendEmail');

// @desc    Create a payment (upload screenshot)
// @route   POST /api/payments
// @access  Private
const createPayment = async (req, res) => {
  try {
    const { courseId, transactionId, amount } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Screenshot is required' });
    }

    const result = await uploadToCloudinary(req.file.buffer);
    
    const payment = new Payment({
      user: req.user._id,
      course: courseId,
      transactionId,
      amount,
      screenshot: {
        url: result.secure_url,
        public_id: result.public_id,
      },
    });

    const createdPayment = await payment.save();
    res.status(201).json(createdPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all payments
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({})
        .populate('user', 'name email')
        .populate('course', 'title price');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update payment status
// @route   PUT /api/payments/:id
// @access  Private/Admin
const updatePaymentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const payment = await Payment.findById(req.params.id);

    if (payment) {
      payment.status = status;
      const updatedPayment = await payment.save();

      // If approved, add course to user's purchasedCourses
      if (status === 'approved') {
        const user = await User.findById(payment.user);
        const course = await Course.findById(payment.course);
        if (user) {
            // Check if course already exists to avoid duplicates
            if (!user.purchasedCourses.includes(payment.course)) {
                user.purchasedCourses.push(payment.course);
                await user.save();
            }

            // Send Email Notification
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Course Purchase Approved',
                    message: `Congratulations! Your payment for ${course?.title || 'the course'} has been approved. You can now access the course in your dashboard.`,
                    html: `<h1>Payment Approved</h1><p>Congratulations! Your payment for <strong>${course?.title || 'the course'}</strong> has been approved.</p><p>You can now access the course in your dashboard.</p>`,
                });
            } catch (emailError) {
                console.error('Error sending email:', emailError);
            }
        }
      }

      res.json(updatedPayment);
    } else {
      res.status(404).json({ message: 'Payment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePaymentStatus,
};
