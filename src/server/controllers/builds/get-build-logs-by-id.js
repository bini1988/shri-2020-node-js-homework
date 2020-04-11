/* eslint-disable prefer-destructuring */
const asyncHandler = require('express-async-handler');
const NotFoundError = require('../../services/errors/not-found-error');

/**
 * @typedef {import('./../../services/ci-manager')} CIManager
 */

/**
 * Получение логов билда о конкретной сборке
 */
module.exports = asyncHandler(async (req, res) => {
  const { buildId } = req.params;
  /**
   * @type {CIManager}
   */
  const ci = req.app.locals.ci;

  try {
    const data = await ci.logs.fetchLogsByBuildId(buildId);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Log of build with id '${buildId}' is not found`, error);
  }
});
