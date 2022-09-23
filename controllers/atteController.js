const pool = require('../Database/config');
const db = require('../Database/index');

//  Register Attendance Table  on DB
exports.atteController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { id } = req.body;

      const default_attend = await db.insertOne(connection, {
        table_name: 'attendance',
        data: {
          id,
          attendance: 100.0,
          department_id: 1
        }
      });
      return res.status(200).json({
        result: true,
        message: 'Successfully added into database',
        data: {
          id: default_attend.insertId,
          ...req.body
        }
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};

//  get student details on DB
exports.studentDetail = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const stud = await db.getOne(connection, {
        table_name: 'student s',
        projection:
          's.id , s.name, s.standard, s.email, s.phone, s.passcode, s.address, s.attendance_id, s.stud_attendance, s.stud_sub',
        condition: `s.id = ? `,
        value: [req.params.id]
      });

      console.log(stud);

      return res.status(200).json({
        result: true,
        student: stud
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};

//  delete student info on DB
exports.deleteStud = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      //  delete the data from db
      await db.deleteOne(connection, {
        table_name: 'student s',
        condition: `s.id = ? `,
        value: [req.params.id]
      });

      return res.status(200).json({
        result: true,
        message: 'Student data has been Deleted Successfully'
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};

// get staff info on DB
exports.staffDetail = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const staffList = await db.getOne(connection, {
        table_name: 'staff st',
        projection:
          'st.id, st.staff_name , st.staff_role, st.staff_sub_role, staff_phone, st.attendance_id, st.staff_attendance',
        condition: `st.id =?`,
        value: [req.params.id]
      });
      return res.status(200).json({
        result: true,
        staff: staffList
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};

//  delete staff info DB
exports.deleteStaff = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      await db.deleteOne(connection, {
        table_name: 'staff sa',
        condition: `sa.id = ? `,
        value: [req.params.id]
      });

      return res.status(200).json({
        result: true,
        message: 'Staff Data has been Deleted Successfully'
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};
