
/**
 * Получение сохраненных настроек
 */
function getSettings(req, res) {
  res.status(200).json({ message: 'get-settings' });
}

module.exports = getSettings;
