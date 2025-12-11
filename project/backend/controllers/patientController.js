const User = require('../models/User');

exports.getAllPatients = async (req, res) => {
  try {
    const patients = await User.find({ role: 'patient' }).select('-passwordHash');
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
