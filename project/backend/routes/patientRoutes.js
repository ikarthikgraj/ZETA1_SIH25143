const express = require('express');
const router = express.Router();
const patientCtrl = require('../controllers/patientController');

router.get('/', patientCtrl.getAllPatients);

module.exports = router;
