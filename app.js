const express = require('express');
const app = express();

// config env process

const { config } = require('dotenv');
config();

//  all routers files
const index = require('./routes/index');
const ITTeam = require('./routes/it');
const student = require('./routes/student');
const attendance = require('./routes/attendance');
const depart = require('./routes/department');
const staff = require('./routes/staff');

// middleware
app.use(express.json({ extended: true }));

// api's
app.use('/school/dashboard', index);
app.use('/school/IT', ITTeam);
app.use('/school/department', depart);
app.use('/school/Attendance', attendance);
app.use('/school/Student', student);
app.use('/school/Staff', staff);

// server listening the port
app.listen(3000, () => {
  console.log('server Started ...!');
});
