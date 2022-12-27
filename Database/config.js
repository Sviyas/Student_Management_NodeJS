/**
 * @TODO connection creating on SQl
 */

// require('dotenv').config();
import { config } from 'dotenv';
config();

const mysql = require('mysql');

/**
 *  @TODO : create a mysql connection for database
 *
 */

// ?  extract the db values into env files
const { DB_USERNAME, DB_PASSWORD, DB_PORT, DB_NAME } = process.env;

const pool = mysql.createPool({
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

module.exports = pool;
