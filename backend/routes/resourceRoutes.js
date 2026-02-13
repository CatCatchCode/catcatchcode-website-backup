const express = require('express');
const router = express.Router();
const {
  getResources,
  addResource,
  updateResource,
  deleteResource,
} = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getResources).post(protect, addResource);
router.route('/:id').put(protect, updateResource).delete(protect, deleteResource);

module.exports = router;
