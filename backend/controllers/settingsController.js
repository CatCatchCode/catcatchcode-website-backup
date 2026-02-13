const Settings = require('../models/Settings');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinaryHelper');

// @desc    Get settings
// @route   GET /api/settings
// @access  Public (or Private based on requirement, usually public to show QR)
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    if (settings) {
        res.json(settings);
    } else {
        res.json({ upiId: '', qrCode: {} }); // Return empty if not set
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update settings
// @route   POST /api/settings
// @access  Private/Admin
const updateSettings = async (req, res) => {
  try {
    const { upiId } = req.body;
    let settings = await Settings.findOne();

    if (!settings) {
        settings = new Settings({ upiId });
    } else {
        settings.upiId = upiId || settings.upiId;
    }

    if (req.file) {
        if (settings.qrCode && settings.qrCode.public_id) {
            await deleteFromCloudinary(settings.qrCode.public_id);
        }
        const result = await uploadToCloudinary(req.file.buffer);
        settings.qrCode = {
            url: result.secure_url,
            public_id: result.public_id,
        };
    }

    const updatedSettings = await settings.save();
    res.json(updatedSettings);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};
