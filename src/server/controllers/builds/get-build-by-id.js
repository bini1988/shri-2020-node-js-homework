/* eslint-disable prefer-destructuring */
const asyncHandler = require('express-async-handler');
const NotFoundError = require('../../services/errors/not-found-error');

/**
 * @typedef {import('./../../services/ci-api')} Api
 */

/**
 * Получение информации о конкретной сборке
 */
module.exports = asyncHandler(async (req, res) => {
  const { buildId } = req.params;
  /**
   * @type {Api}
   */
  const api = req.app.locals.api;

  try {
    const { data } = await api.Build.fetchBuild(buildId);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Build with id '${buildId}' is not found`, error);
  }
});
