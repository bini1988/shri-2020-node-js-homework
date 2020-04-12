const asyncHandler = require('express-async-handler');
const api = require('../../services/ci-api');

/**
 * Удаление сохраненных настроек
 */
module.exports = asyncHandler(async (req, res) => {
  await api.Settings.delete();
  res.status(200).end();
});
