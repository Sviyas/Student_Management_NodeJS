import express from 'express';
import { staffController } from '../Controllers/staffController';
import { staffValidator } from '../validator/staffValidator';

const staff = express.Router();

// ? Staff

staff.post('/Register', staffValidator, staffController);
staff.post('/Register/Login');

export default staff;
