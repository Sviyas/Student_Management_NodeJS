import express from 'express';
import {
  DepartmentList,
  studentDetail,
  deleteStud,
  staffDetail,
  deleteStaff,
  listAllStudent,
  listAllDepartment,
  deletedepartment,
  litstaff
} from '../Controllers/ITController';

const ITTeam = express.Router();

// ! department
ITTeam.get('/department/:id', DepartmentList);
ITTeam.get('/department-list', listAllDepartment);
ITTeam.get('/department-delete/:id', deletedepartment);

// ! student api

ITTeam.get('/student/:id', studentDetail);
ITTeam.get('/student/delete/:id', deleteStud);
ITTeam.get('/list-student', listAllStudent);

// ! Staff api
ITTeam.get('/staff/:id', staffDetail);
ITTeam.get('/staff/delete/:id', deleteStaff);
ITTeam.get('/staff-list', litstaff);

export default ITTeam;
