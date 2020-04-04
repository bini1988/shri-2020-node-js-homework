const logger = require('../services/logger');
const ValidationError = require('../services/errors/validation-error');
const NotFoundError = require('../services/errors/not-found-error');

// eslint-disable-next-line no-unused-vars
function handleErrors(err, req, res, _next) {
  const { method, url } = req;

  logger.error(`Request error [${method}] '${url}'`);
  logger.error('Error: ', err.reason || err);

  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: 'ValidationError',
      message: err.message,
    });
  }
  if (err instanceof NotFoundError) {
    return res.status(404).json({
      error: 'NotFoundError',
      message: err.message || `The requested resource '${url}' was not found on this server`,
    });
  }
  return res.status(500).json({
    error: 'Internal Error',
    message: 'Server has fallen into unrecoverable problem',
  });
}

module.exports = { handleErrors };
