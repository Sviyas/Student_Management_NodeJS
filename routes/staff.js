const express = require('express');
const router = express.Router();
const { staffController } = require('../controllers/staffController');

// Register staff details
router.post('/Register', staffController);

module.exports = router;
