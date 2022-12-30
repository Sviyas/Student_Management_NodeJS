import pool from '../Database/config';
import db from '../Database/index';

//  ? Register staff details
export const staffController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { staff_name, staff_role, staff_phone, staff_sub_role, staff_attendance } = req.body;

      const staffRegister = await db.insertOne(connection, {
        table_name: 'staff',
        data: {
          staff_name,
          staff_role,
          staff_phone,
          staff_sub_role,
          staff_attendance,
          attendance_id: 1
        }
      });
      return res.status(201).json({
        result: true,
        message: 'Staff data was added ✌️',
        data: {
          id: staffRegister.insertId,
          ...req.body
        }
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};
