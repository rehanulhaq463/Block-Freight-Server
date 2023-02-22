const path = require('path');

const express = require('express');

const adminController = require('../../controllers/assigntrip');

const router = express.Router();

router.get('/viewassignedtrips', adminController.viewassignedtrips);

router.post('/createtrip', adminController.createtrip);

module.exports = router;