const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'Email exists' });
    const hash = await bcrypt.hash(password, 10);
    const u = new User({ name, email, passwordHash: hash, role });
    await u.save();
    res.json({ msg: 'Registered' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if (!u) return res.status(400).json({ msg: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, name: u.name, role: u.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
