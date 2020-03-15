const asyncHandler = require('express-async-handler');
const NotFoundError = require('../../services/errors/not-found-error');
const api = require('../../services/ci-api');

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  const { commitHash } = req.params;

  try {
    const params = { commitHash };
    const data = await api.Build.queueBuild(params);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Build with commit '${commitHash}' is not found`);
  }
});
