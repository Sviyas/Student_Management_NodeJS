import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import compression from 'compression';

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

// ? set dev logger for better viewing response with optimization
app.use(morgan('dev'));

// ? compress all  responses
async function shouldCompress(req, res) {
  if (req.header['x-no-compression'] === true) {
    return false;
  }
  // fallback to standard filter function
  return compression.filter(req, res);
}
app.use(compression({ filter: shouldCompress }));

// ? set up express response and body parser configuration
app.use(express.json());

// ? configure cors domain options
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200
  })
);

// ? route file
app.use('/school/dashboard', index);
app.use('/school/IT', ITTeam);
app.use('/school/department', depart);
app.use('/school/Attendance', attendance);
app.use('/school/Student', student);
app.use('/school/Staff', staff);

// ? server listening
app.listen(process.env.PORT || 5000, () => {
  console.log('server Started ...!');
});
