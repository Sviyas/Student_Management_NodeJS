import express from 'express';

import { signUpValidator, loginValidator } from '../validator/userValidator';

import { studController, studLoginController } from '../controllers/studController';

const student = express.Router();

// ? Student

student.post('/Register', signUpValidator, studController);

student.post('/Register/login', loginValidator, studLoginController);

export default student;
