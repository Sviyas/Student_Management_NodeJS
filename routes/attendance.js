import express from 'express';
import { atteController, attendanceDelte } from '../controllers/atteController';

const attendance = express.Router();

// ? Attendence

attendance.post('/', atteController);

attendance.get('/delete/:id', attendanceDelte);

export default attendance;
