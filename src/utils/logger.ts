import fs from 'fs';
import path from 'path';
import winston from 'winston';

const isServerless = !!process.env.VERCEL;

const transports: winston.transport[] = [new winston.transports.Console()];

if (!isServerless) {
  const logsDir = path.join(process.cwd(), 'logs');
  fs.mkdirSync(logsDir, { recursive: true });
  transports.push(
    new winston.transports.File({ filename: path.join(logsDir, 'combined.log') }),
    new winston.transports.File({ filename: path.join(logsDir, 'error.log'), level: 'error' }),
  );
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),
  ),
  transports,
});

export default logger;
