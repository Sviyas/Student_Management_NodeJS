const express = require('express');
const router = express.Router();
const { signUpValidator, loginValidator } = require('../validator/userValidator');
const { studController, studLoginController } = require('../controllers/studController');

// ? Register student details
router.post('/Register', signUpValidator, studController);

// ? Student login
router.post('/Register/login', loginValidator, studLoginController);

module.exports = router;
