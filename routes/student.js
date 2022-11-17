const express = require('express');
const router = express.Router();
const { loginValidator } = require('../validator/userValidator');
const { studController, studLoginController } = require('../controllers/studController');

//  Register student details
router.post('/Register', loginValidator, studController);

// Student login
router.post('/Register/login', studLoginController);

module.exports = router;
