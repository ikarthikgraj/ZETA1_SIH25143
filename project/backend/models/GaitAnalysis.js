const mongoose = require('mongoose');

const gaitSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now },
  stepCount: Number,
  asymmetryIndex: Number,
  coP: { x: Number, y: Number },
  events: [String],
  summary: Object
});

module.exports = mongoose.model('GaitAnalysis', gaitSchema);
