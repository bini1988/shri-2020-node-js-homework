const asyncHandler = require('express-async-handler');
const api = require('../../services/ci-api');

/**
 * Получение сохраненных настроек
 */
module.exports = asyncHandler(async (req, res) => {
  res.status(200).json(await api.Settings.fetch());
});
