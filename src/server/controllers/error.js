const logger = require('../services/logger');
const ValidationError = require('../services/errors/validation-error');
const NotFoundError = require('../services/errors/not-found-error');

// eslint-disable-next-line no-unused-vars
function handleErrors(err, req, res, _next) {
  const { method, url } = req;
  const tag = `Request error [${method}] '${url}'`;
  const message = err.toString();

  if (err instanceof ValidationError) {
    const error = 'ValidationError';

    logger.error(`${tag} ${error}: ${message}`);

    return res.status(200).json({ error, message });
  }
  if (err instanceof NotFoundError) {
    const error = 'NotFoundError';

    logger.error(`${tag} ${error}: ${message}`);

    return res.status(404).json({ error, message });
  }

  logger.error(`${tag} Internal Error ${message}`);

  return res.status(500).json({
    error: 'Internal Error',
    message: 'Server has fallen into unrecoverable problem',
  });
}

module.exports = { handleErrors };
