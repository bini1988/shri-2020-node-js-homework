const asyncHandler = require('express-async-handler');
const api = require('../../services/ci-api');

/**
 * Получение сохраненных настроек
 */
module.exports = asyncHandler(async (req, res) => {
  const data = await api.Settings.fetch();

  res.status(200).json({ data });
});
