const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  url: {
    type: String,
    required: [true, 'Please add a URL'],
  },
  section: {
    type: String,
    enum: ['Home', 'Video', 'AI', 'Handwritten', 'Notes', 'Lab', 'Papers', 'Portfolio'],
    default: 'Notes',
  },
  provider: {
    type: String,
    enum: ['youtube', 'drive', 'dropbox', 'notion', 'github', 'pdf', 'other'],
    default: 'other',
  },
  progress: {
    type: Number,
    default: 0, // Percentage 0-100
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  lastPosition: {
    type: Number,
    default: 0, // In seconds
  },
  timestamps: [{
    label: String,
    time: Number, // In seconds
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Resource', resourceSchema);
