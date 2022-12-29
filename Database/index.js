/**
 *
 * @param {*} pool - Create a Pool Connection
 * @returns
 */
exports.poolConnect = pool => {
  // console.log('Database running....');
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      return resolve(connection);
    });
  });
};

/**
 *
 * @param {*} connection - connection
 * @param {*} options - Projection
 * @description - Get One Field on Data
 */
exports.getOne = (connection, options) => {
  // console.log('options : ', options);
  // console.log(options);
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT ${options.projection} FROM ${options.table_name} WHERE ${options.condition}`,
      options.value,
      (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      }
    );
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - Insert One Field on Data
 */
exports.insertOne = (connection, options) => {
  // console.log(options);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${options.table_name} SET ?`, options.data, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - Delete One Field
 */
exports.deleteOne = (connection, options) => {
  // console.log(options);
  return new Promise((resolve, reject) => {
    connection.query(`DELETE FROM ${options.table_name} WHERE ${options.condition}`, options.value, (err, result) => {
      if (err) return reject(err);
      // console.log(result);
      return resolve(result);
    });
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description  - Get All Data
 */
exports.getAll = (connection, options) => {
  // console.log('options : ', options);
  return new Promise((resolve, reject) => {
    connection.query(`SELECT ${options.projection} FROM ${options.table_name}`, (err, results) => {
      if (err) return reject(err);
      // console.log('errorrrrrrrrrrr', err);
      return resolve(results);
    });
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - get multiple Data
 */
exports.getMulti = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `select ${options.projection}  from ${options.table_names} where ${options.conditions} `,
      options.value,
      (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      }
    );
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - update one field
 */
exports.updateOne = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${options.table_name} SET ${options.updating_fields} WHERE ${options.key} = ?`,
      [...options.updating_values, options.value],
      (err, results) => {
        if (err) return reject(err);

        // logger.info(`Updated successfully - affected rows - ${results.affectedRows}`);
        return resolve(results);
      }
    );
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - update by multiple conditions
 */
exports.updateByMultipleCondition = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${options.table_name} SET ${options.updating_fields} WHERE ${options.key}`,
      [...options.updating_values, ...options.value],
      (err, results) => {
        if (err) return reject(err);

        logger.info(`Updated successfully - affected rows - ${results.affectedRows}`);
        return resolve(results);
      }
    );
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - Update Foreign Key Mode
 */
exports.foreignKeyMode = (connection, mode) => {
  return new Promise((resolve, reject) => {
    connection.query(`SET FOREIGN_KEY_CHECKS = ?`, mode, err => {
      if (err) return reject(err);

      logger.info(mode === 0 ? 'Foreign key Disabled' : 'Foreign key Enabled');
      return resolve(true);
    });
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - Insert Multiple Data
 */
exports.insertIntoMultiData = (connection, options) => {
  return new Promise((resolve, reject) => {
    const baseQ = `INSERT INTO SET ? ; `;

    let genQ = baseQ.repeat(options.data.length);

    genQ = genQ.replace(/INSERT INTO/g, `INSERT INTO ${options.table_name}`);

    // Make an multiple query at a time
    connection.query(`${genQ}`, options.data, (err, results) => {
      if (err) return reject(err);

      logger.info(`Multiple data inserted!`);

      /**
       *  Convert standard format to array of object for the issue
       * object or array of object by returning insertIntoMultiData fn
       * */
      return resolve([].concat(results));
    });
  });
};

/**
 *
 * @param {*} connection - Connection
 * @param {*} options - projection
 * @description - Insert into Multiple Table
 */
exports.insertIntoMultiTables = (connection, options) => {
  return new Promise((resolve, reject) => {
    const baseQ = `INSERT INTO ? SET ? ; `;

    let genQ = baseQ.repeat(options.length);

    const data = [];

    // make our query with data array
    options.forEach(v => {
      genQ = genQ.replace('INSERT INTO ?', `INSERT INTO ${v.table_name}`);
      data.push(v.data);
    });

    // Make an multiple query at a time
    connection.query(`${genQ}`, data, (err, results) => {
      if (err) return reject(err);

      logger.info(`Multiple data inserted!`);
      return resolve(results);
    });
  });
};
