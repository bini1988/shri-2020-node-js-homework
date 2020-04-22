/* eslint-disable prefer-destructuring */
const asyncHandler = require('express-async-handler');

/**
 * @typedef {import('./../../services/ci-api')} Api
 */

/**
 * Получение сохраненных настроек
 */
module.exports = asyncHandler(async (req, res) => {
  /**
   * @type {Api}
   */
  const api = req.app.locals.api;
  const { data } = await api.Settings.fetch();
  res.status(200).json({ data });
});
