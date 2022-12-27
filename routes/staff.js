import express from 'express';
import { staffController } from '../controllers/staffController';
import { staffValidator } from '../validator/staffValidator';

const staff = express.Router();

// ? Staff

staff.post('/Register', staffValidator, staffController);
staff.post('/Register/Login');

export default staff;
