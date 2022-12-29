// const mysql = require('mysql');
import logger from '../Config/index';
import mysql from 'mysql';
import { config } from 'dotenv';
config();

/**
 * @TODO Setup Mysql Connection
 */

// ?  config env files
const { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

try {
  var pool = mysql.createPool({
    user: DB_USERNAME,
    password: DB_PASSWORD,
    port: DB_PORT ? +DB_PORT : 3306,
    database: DB_NAME,
    acquireTimeout: 20000,
    multipleStatements: true,
    connectionLimit: 5,
    charset: 'utf8mb4',
    debug: false
  });
  logger.info('MySql Database Connected');
} catch (err) {
  // ? db error
  logger.info({ message: 'Database Not Connected !', level: 'error', error: err });
}

module.exports = pool;
