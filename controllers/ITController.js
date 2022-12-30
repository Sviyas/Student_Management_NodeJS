import pool from '../Database/config';
import db from '../Database/index';
import errorHandleMangeer from '../Errors';

// ! Department api

//  ? get one Department List
export const DepartmentList = async (req, res) => {
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
        return res.status(204).json('Department ID is not valid');
      }
      return res.status(200).json({
        result: true,
        staffs: listDep
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Get All Department List
export const listAllDepartment = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const list_department = await db.getAll(connection, {
        table_name: 'department',
        projection: 'id, dep_name'
      });

      return res.status(200).json({
        result: true,
        message: 'Success',
        data: list_department
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? delete department
export const deletedepartment = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);

    try {
      const delete_depart = await db.deleteOne(connection, {
        table_name: 'department',
        condition: 'id = ?',
        value: req.params.id
      });

      if (delete_depart.length === 0) res.status(401).json({ message: 'Department id is must valid' });

      return res.status(200).json({
        result: true,
        message: 'delete Successfully'
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ! Student api

// ? get all student details
export const listAllStudent = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const list_student = await db.getAll(connection, {
        table_name: 'student s',
        projection: 's.id, s.name, s.stud_attendance'
      });

      return res.status(200).json({
        result: true,
        message: 'Success',
        data: list_student
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Get One Student Details
export const studentDetail = async (req, res) => {
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
      // console.log(stud);
      if (!stud.length) return res.status(403).json('This data has not been stored in Database ...😥');

      return res.status(200).json({
        result: true,
        student: stud
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Delete One Student Detail
export const deleteStud = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      // ? delete the data from db
      const studDeleID = await db.deleteOne(connection, {
        table_name: 'student s',
        condition: `s.id = ? `,
        value: [req.params.id]
      });

      if (!studDeleID.length) return res.status(411).json('Id must be valid');
      return res.status(202).json({
        result: true,
        message: 'Student data has been Deleted Successfully'
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ! Staff api

// ? Get One Staff Detail
export const staffDetail = async (req, res) => {
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
      if (!staffList.length) return res.status(403).json('This data has been not stored in database 😢!!!');
      return res.status(200).json({
        result: true,
        staff: staffList
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Get all Staff details
export const litstaff = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);

    try {
      const list_staff = await db.getAll(connection, {
        table_name: 'staff',
        projection: 'id, staff_name, staff_role'
      });

      return res.status(200).json({
        result: true,
        message: 'Staff List',
        data: list_staff
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Delete One Staff Detail
export const deleteStaff = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      await db.deleteOne(connection, {
        table_name: 'staff',
        condition: `id = ? `,
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
    return errorHandleMangeer(err, res);
  }
};
