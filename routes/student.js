const express = require('express');
const router = express.Router();
const { studController } = require('../controllers/studController');

//  Register student details
router.post('/Register', studController);

module.exports = router;
