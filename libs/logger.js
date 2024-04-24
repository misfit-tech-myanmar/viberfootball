const { format } = require('util');
const winston = require('winston');
const moment = require('moment-timezone');

// Set the default timezone to Myanmar
moment.tz.setDefault('Asia/Yangon');

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info', // Set default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamp
        winston.format.printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    transports: [
        // Log to console
        new winston.transports.Console()
    ]
});

// Override timestamp format to display Myanmar time
logger.format.timestamp = () => moment().format('YYYY-MM-DD HH:mm:ss');

module.exports = logger;