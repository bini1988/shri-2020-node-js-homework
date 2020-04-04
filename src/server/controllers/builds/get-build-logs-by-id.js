const asyncHandler = require('express-async-handler');
const NotFoundError = require('../../services/errors/not-found-error');
const CILogs = require('../../services/ci-logs');

/**
 * Получение логов билда о конкретной сборке
 */
module.exports = asyncHandler(async (req, res) => {
  const { buildId } = req.params;

  try {
    const data = await CILogs.fetchLogsByBuildId(buildId);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Log of build with id '${buildId}' is not found`, error);
  }
});
