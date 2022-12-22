const express = require('express');
const router = express.Router();
const { staffController } = require('../controllers/staffController');
const { staffValidator } = require('../validator/staffValidator');

// ? Register staff details
router.post('/Register', staffValidator, staffController);

module.exports = router;
