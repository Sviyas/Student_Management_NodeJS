const pool = require('../Database/config');
const db = require('../Database/index');

exports.staffController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { id, staff_name, staff_role, staff_phone, staff_sub_role, staff_attendance } = req.body;

      const staffRegister = await db.insertOne(connection, {
        table_name: 'staff',
        data: {
          id,
          staff_name,
          staff_role,
          staff_phone,
          staff_sub_role,
          staff_attendance,
          attendance_id: 1
        }
      });
      return res.status(200).json({
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
    if (err) throw err;
  }
};
