const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  upiId: {
    type: String,
    required: true,
  },
  qrCode: {
    url: String,
    public_id: String,
  },
}, {
  timestamps: true,
});

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
