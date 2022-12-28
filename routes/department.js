import express from 'express';
import { departmentRegister } from '../Controllers/depController';
import { departmentValidator } from '../validator/deptValidator';

const depart = express.Router();

// ? Department

depart.post('/Register', departmentValidator, departmentRegister);

export default depart;
