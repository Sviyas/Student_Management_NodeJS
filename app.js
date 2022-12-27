import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import index from './routes/index';
import student from './routes/student';
import ITTeam from './routes/it';
import attendance from './routes/attendance';
import depart from './routes/department';
import staff from './routes/staff';

// ? set up env configuration
config();

// ? setup app
const app = express();

// ? set multiple origin
app.use(cors({ origin: '*', optionsSuccessStatus: 200 }));

// ? middleware function for body parser
app.use(express.json({ extended: true }));

// ? route file
app.use('/school/dashboard', index);
app.use('/school/IT', ITTeam);
app.use('/school/department', depart);
app.use('/school/Attendance', attendance);
app.use('/school/Student', student);
app.use('/school/Staff', staff);

// ? server
app.listen(process.env.PORT || 5000, () => {
  console.log('server Started ...!');
});
