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
