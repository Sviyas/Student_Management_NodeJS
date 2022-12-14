import pool from '../Database/config';
import db from '../Database/index';
import errorHandleMangeer from '../Errors';

// ? Register Attendance table
export const atteController = async (req, res) => {
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
          id: default_attend.insertId
        }
      });
    } finally {
      connection.release();
    }
  } catch (err) {
    return errorHandleMangeer(err, res);
  }
};

// ? Delete Attendance table
export const attendanceDelte = async (req, res) => {
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
    return errorHandleMangeer(err, res);
  }
};
