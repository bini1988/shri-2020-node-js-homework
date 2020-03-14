const logger = require('../services/logger');

function handleLogging(req, res, next) {
  const { method, url } = req;
  logger.info(`[${method}] ${url}`);
  next();
}

module.exports = { handleLogging };
