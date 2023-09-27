import { createLogger, format, transports } from 'winston';
import dotenv from 'dotenv';

dotenv.config();

// Configuro formato del log
const logFormat = format.combine(
	format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	format.printf(({ timestamp, level, message }) => {
		return `${timestamp} [${level}]: ${message}`;
	})
);

const logger = createLogger({
	level: process.env.BLOG_LOG_LEVEL, // nivel de registro ('debug','info', 'warn', 'error',)
	format: logFormat,
	transports: [
		new transports.Console(),
		new transports.File({ filename: 'app.log' }),
	],
});

export default logger;