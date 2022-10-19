const express = require('express');
const {
  atteController,
  studentDetail,
  deleteStud,
  deleteStaff,
  staffDetail,
  attendanceDelte
} = require('../controllers/atteController');
const router = express.Router();

//  create attendance controller and make default values
router.post('/', atteController);

// router will delete attendance ids
router.get('/delete/:id', attendanceDelte);

// get student details
router.get('/student/:id', studentDetail);

// using attendance id to delete the student information
router.get('/student/delete/:id', deleteStud);

//  using attendance id to show  staff details
router.get('/staff/:id', staffDetail);

// using attendance id to delete the staff information
router.get('/staff/delete/:id', deleteStaff);
module.exports = router;
