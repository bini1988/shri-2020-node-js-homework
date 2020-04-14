/* eslint-disable prefer-destructuring */
const asyncHandler = require('express-async-handler');

/**
 * Удаление сохраненных настроек
 */
module.exports = asyncHandler(async (req, res) => {
  /**
   * @type {Api}
   */
  const api = req.app.locals.api;
  await api.Settings.delete();
  res.status(200).end();
});
