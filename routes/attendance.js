import express from 'express';
import { atteController, attendanceDelte } from '../Controllers/atteController';

const attendance = express.Router();

// ? Attendence

attendance.post('/', atteController);

attendance.get('/delete/:id', attendanceDelte);

export default attendance;
