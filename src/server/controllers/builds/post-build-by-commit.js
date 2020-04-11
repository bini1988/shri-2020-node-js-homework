/* eslint-disable prefer-destructuring */
const asyncHandler = require('express-async-handler');

/**
 * @typedef {import('./../../services/ci-manager')} CIManager
 */

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  /**
   * @type {CIManager}
   */
  const ci = req.app.locals.ci;
  const data = await ci.run(req.params.commitHash);

  res.status(200).json({ data });
});
