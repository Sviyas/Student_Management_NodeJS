const express = require('express');
const router = express.Router();
const { departmentRegister } = require('../controllers/depController');

//  register a department into database
router.post('/Register', departmentRegister);

module.exports = router;
