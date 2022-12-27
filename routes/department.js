import express from 'express';
import { departmentRegister } from '../controllers/depController';
import { departmentValidator } from '../validator/deptValidator';

const depart = express.Router();

// ? Department

depart.post('/Register', departmentValidator, departmentRegister);

export default depart;
