const NotFoundError = require('../services/errors/not-found-error');

function handle404Error(req) {
  const { method, url } = req;

  throw new NotFoundError(`[${method}] ${url}`);
}

module.exports = { handle404Error };
