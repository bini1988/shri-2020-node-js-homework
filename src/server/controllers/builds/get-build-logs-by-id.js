
/**
 * Получение логов билда о конкретной сборке
 */
function getBuildLogsById(req, res) {
  const { buildId } = req.params;

  res.status(200).json({ message: `get-build-logs-by-id-${buildId}` });
}

module.exports = getBuildLogsById;
