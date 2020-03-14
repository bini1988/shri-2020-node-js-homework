
/**
 * Получение информации о конкретной сборке
 */
function getBuildById(req, res) {
  const { buildId } = req.params;

  res.status(200).json({ message: `get-build-by-id-${buildId}` });
}

module.exports = getBuildById;
