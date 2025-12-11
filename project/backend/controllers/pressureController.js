const PressureData = require('../models/PressureData');
const GaitAnalysis = require('../models/GaitAnalysis');

exports.savePressure = async (req, res) => {
  try {
    const { patientId, pressureMatrix, imu, meta } = req.body;
    const pd = new PressureData({ patientId, pressureMatrix, imu, meta });
    await pd.save();
    // Optionally create a lightweight gait summary
    const ga = new GaitAnalysis({
      patientId,
      stepCount: meta?.stepCount || 0,
      asymmetryIndex: meta?.asymmetry || 0,
      coP: meta?.coP || {x:0,y:0},
      events: meta?.events || [],
      summary: meta?.summary || {}
    });
    await ga.save();
    res.json({ ok: true, id: pd._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPressureByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const items = await PressureData.find({ patientId }).sort({ timestamp: -1 }).limit(200);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
