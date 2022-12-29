import { config } from 'dotenv';
const { format, createLogger, transports } = require('winston');
const { combine, timestamp, label, prettyPrint, colorize, json } = format;

config();

const { NODE_ENV } = process.env;

// ? Custom Colors
const customColors = {
  info: 'italic blue',
  warn: 'bold yellow',
  error: 'bold red'
};
/**
 * @param level -
 * @param
 */
const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: NODE_ENV }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    json(),
    prettyPrint(),
    colorize({ all: true, colors: customColors })
  ),
  transports: [
    new transports.File({
      filename: 'logs.log'
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new transports.Console()
  ],
  exitOnError: true
});

export default logger;