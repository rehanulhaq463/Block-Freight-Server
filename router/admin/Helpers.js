const path = require('path');

const express = require('express');

const adminController = require('../../controllers/admin');

const router = express.Router();

// /admin/login => GET
router.get('/login', adminController.login);

// /admin/singup => GET
router.post('/signup', adminController.signup);

module.exports = router;
