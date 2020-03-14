const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: process.env.SERVER_LOG_LEVEL || 'info',
  format: format.json(),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    level: 'silly',
    format: format.simple(),
  }));
}

module.exports = logger;
