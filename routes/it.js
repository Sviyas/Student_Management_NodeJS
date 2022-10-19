const express = require('express');
const { DepartmentList, studentDetail, deleteStud, staffDetail, deleteStaff } = require('../controllers/ITController');
const router = express.Router();

//  get the department list
router.get('/department/:id', DepartmentList);
module.exports = router;

// get student details
router.get('/student/:id', studentDetail);

// using attendance id to delete the student information
router.get('/student/delete/:id', deleteStud);

//  using attendance id to show  staff details
router.get('/staff/:id', staffDetail);

// using attendance id to delete the staff information
router.get('/staff/delete/:id', deleteStaff);

module.exports = router;
