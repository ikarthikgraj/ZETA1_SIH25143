const mongoose = require('mongoose');

const pressureSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  pressureMatrix: [[Number]], // 2D array: rows x cols of sensors
  imu: {
    ax: Number,
    ay: Number,
    az: Number,
    gx: Number,
    gy: Number,
    gz: Number
  },
  meta: Object
});

module.exports = mongoose.model('PressureData', pressureSchema);
