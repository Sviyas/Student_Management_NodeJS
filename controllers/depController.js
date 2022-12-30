import pool from '../Database/config';
import db from '../Database/index';
import errorHandleMangeer from '../Errors';

// ? Register Department
export const departmentRegister = async (req, res) => {
  try {
    const connection = await db.poolConnect(pool);
    try {
      const { dep_name, id } = req.body;

      const new_dep = await db.insertOne(connection, {
        table_name: 'department',
        data: {
          id,
          dep_name,
          it_team_id: 1
        }
      });

      return res.status(201).json({
        result: true,
        message: 'successfully added into database...',
        data: {
          id: new_dep.insertId,
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
