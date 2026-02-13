const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourseById,
  createCourse,
  deleteCourse,
  updateCourse
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, admin, upload.single('thumbnail'), createCourse);

router.route('/:id')
    .get(getCourseById)
    .delete(protect, admin, deleteCourse)
    .put(protect, admin, upload.single('thumbnail'), updateCourse);

module.exports = router;
