const express = require('express');
const { DepartmentList } = require('../controllers/ITController');
const router = express.Router();

//  get the department list
router.get('/department/:id', DepartmentList);
module.exports = router;
