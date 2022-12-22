const { FAILED_DEPENDENCY } = require('http-status-codes');
const pool = require('../Database/config');
const db = require('../Database/index');

// ? Register Attendance Table  on DB
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

      if (!default_attend.length) return res.status(204);
      return res.status(201).json({
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

// ? this file will be use to delete attendance id in db
exports.attendanceDelte = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const atteDel = await db.deleteOne(connection, {
        table_name: 'attendance a',
        condition: `a.id =?`,
        value: [req.params.id]
      });
      if (!atteDel.length) return res.status(201);
      return res.status(202).json({
        result: true,
        message: 'Attendance id is delete successfully'
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    if (err) throw err;
  }
};
