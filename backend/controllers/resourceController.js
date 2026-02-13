const asyncHandler = require('express-async-handler');
const Resource = require('../models/Resource');

// @desc    Get user resources
// @route   GET /api/resources
// @access  Private
const getResources = asyncHandler(async (req, req_res) => {
  const resources = await Resource.find({ user: req.user._id }).sort({ createdAt: -1 });
  req_res.json(resources);
});

// @desc    Add new resource
// @route   POST /api/resources
// @access  Private
const addResource = asyncHandler(async (req, res) => {
  const { title, url, section, provider } = req.body;

  if (!title || !url) {
    res.status(400);
    throw new Error('Please provide title and URL');
  }

  const resource = await Resource.create({
    user: req.user._id,
    title,
    url,
    section: section || 'Notes',
    provider: provider || 'other',
  });

  res.status(201).json(resource);
});

// @desc    Update resource progress
// @route   PUT /api/resources/:id
// @access  Private
const updateResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error('Resource not found');
  }

  // Check user
  if (resource.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedResource = await Resource.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedResource);
});

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
const deleteResource = asyncHandler(async (req, res) => {
  const resource = await Resource.findById(req.params.id);

  if (!resource) {
    res.status(404);
    throw new Error('Resource not found');
  }

  // Check user
  if (resource.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await resource.deleteOne();

  res.json({ id: req.params.id });
});

module.exports = {
  getResources,
  addResource,
  updateResource,
  deleteResource,
};
