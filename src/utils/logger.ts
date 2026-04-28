import fs from 'fs';
import path from 'path';
import winston from 'winston';

const logsDir = path.join(process.cwd(), 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }),
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
  ],
});

export default logger;
