/**
 *
 * @param {*} pool
 * @returns  list of all poolCoonection is used to indicate each condition performing similar tasks
 *            to save time and less code for this project
 */

//  get a pool connection
exports.poolConnect = pool => {
  // console.log('Database running....');
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      return resolve(connection);
    });
  });
};

// get a all data from given table
exports.getOne = (connection, options) => {
  console.log(options);
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

//  inset a data to database
exports.insertOne = (connection, options) => {
  // console.log(options);
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${options.table_name} SET ?`, options.data, (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
  });
};

//  Delete the data into database
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

// this method is used to get all the data from database
exports.getAll = (connection, options) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT ${options.projection} FROM ${options.table_names}`, (err, results) => {
      if (err) return reject(err);

      return resolve(results);
    });
  });
};

//  this method is used to get multiple all the data from database
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

//  this method is used to update from the database
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

// this method is used to update multiple condition on database
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

//  this method is used to check foreign key
exports.foreignKeyMode = (connection, mode) => {
  return new Promise((resolve, reject) => {
    connection.query(`SET FOREIGN_KEY_CHECKS = ?`, mode, err => {
      if (err) return reject(err);

      logger.info(mode === 0 ? 'Foreign key Disabled' : 'Foreign key Enabled');
      return resolve(true);
    });
  });
};

//  this method is used to insert into multiple data to database
exports.insertIntoMultiData = (connection, options) => {
  return new Promise((resolve, reject) => {
    const baseQ = `INSERT INTO SET ? ; `;

    let genQ = baseQ.repeat(options.data.length);

    // genQ = replaceAll(genQ, 'INSERT INTO ?', `INSERT INTO ${options.table_name}`);
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

//  this method is used to insert multiple table in to database
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
