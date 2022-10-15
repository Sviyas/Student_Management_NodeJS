const express = require('express');
const router = express.Router();
const { studController, studLoginController } = require('../controllers/studController');

//  Register student details
router.post('/Register', studController);

// Student login
router.post('/Register/login', studLoginController);

module.exports = router;
