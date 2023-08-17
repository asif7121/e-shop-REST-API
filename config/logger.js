// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, printf , colorize} = format;

// const myFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// const logger = createLogger({
//   format: combine(colorize(), timestamp({}), myFormat ),
//   transports: [new transports.Console()]
// });

// export default logger

import winston from 'winston'

const logger = winston.createLogger({
	format: winston.format.combine(
		winston.format.errors({ stack: true }),
		winston.format.label({ label: '[LOGGER]' }),
		winston.format.timestamp({ format: 'YY-MM-DD HH:MM:SS' }),
		winston.format.printf(
			(log) =>
				` ${log.label}  ${log.timestamp}  ${log.level} : ${log.message} ${log.stack ? log.stack : ''
				}`
		)
	),
	transports: [
		new winston.transports.File({
			level: 'info',
			filename: './logs/all-logs.log',
			handleExceptions: true,
			json: true,
			maxsize: 5242880, // 5MB
			maxFiles: 5, // if log file size is greater than 5MB, logfile2 is generated
			colorize: true,
		}),
		new winston.transports.Console({
			format: winston.format.combine(winston.format.colorize({ all: true })),
			level: 'debug',
			handleExceptions: true,
			json: false,
			colorize: true,
			timestamp: true,
		}),
	],
	exceptionHandlers: [
		new winston.transports.File({
			filename: './logs/exceptions.log',
			timestamp: true,
			maxsize: 5242880,
			json: true,
			colorize: true,
		}),
	],
	exitOnError: false,
})

export default logger

