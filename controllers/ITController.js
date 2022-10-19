const pool = require('../Database/config');
const db = require('../Database/index');

//  view all department on IT_Team
exports.DepartmentList = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const listDep = await db.getOne(connection, {
        table_name: 'department d',
        projection: 'd.id , d.dep_name',
        condition: `d.id = ?`,
        value: [req.params.id]
      });
      if (!listDep.length) {
        return res.status(204);
      }
      return res.status(200).json({
        result: true,
        staffs: listDep
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

      if (!stud.length) return res.status(204);
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

      return res.status(202).json({
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
      if (!staffList.length) return res.status(204);
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

      return res.status(202).json({
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
