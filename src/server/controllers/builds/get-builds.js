
/**
 * Получение списка сборок
 */
function getBuilds(req, res) {
  res.status(200).json({ message: 'get-builds' });
}

module.exports = getBuilds;
