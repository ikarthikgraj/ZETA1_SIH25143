const express = require('express');
const router = express.Router();
const pressure = require('../controllers/pressureController');

router.post('/save', pressure.savePressure);
router.get('/patient/:patientId', pressure.getPressureByPatient);

module.exports = router;
