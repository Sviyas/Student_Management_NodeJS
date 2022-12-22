const express = require('express');
const { atteController, attendanceDelte } = require('../controllers/atteController');
const router = express.Router();

// ? create attendance controller and make default values
router.post('/', atteController);

// ?  router will delete attendance ids
router.get('/delete/:id', attendanceDelte);

module.exports = router;
