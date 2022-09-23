// extract the mysql from in this page
const pool = require('../Database/config');
// get a connection from database
const db = require('../Database/index');
/**
 *
 * @Todo : create a student
 *
 */
exports.studController = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { id, name, standard, email, phone, passcode, address, stud_sub, stud_attendance } = req.body;

      const studRegister = await db.insertOne(connection, {
        table_name: 'student',
        data: {
          id,
          name,
          standard,
          email,
          phone,
          passcode,
          address,
          stud_sub,
          stud_attendance,
          attendance_id: 2
        }
      });

      return res.status(200).json({
        result: true,
        message: 'Thank you for Registering student websitee... 😍😍',
        data: {
          id: studRegister.insertId,
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
