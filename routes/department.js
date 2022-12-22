const express = require('express');
const router = express.Router();
const { departmentRegister } = require('../controllers/depController');
const { departmentValidator } = require('../validator/deptValidator');

// ? register a department into database
router.post('/Register', departmentValidator, departmentRegister);

module.exports = router;
