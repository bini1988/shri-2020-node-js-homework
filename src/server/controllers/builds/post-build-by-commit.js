const asyncHandler = require('express-async-handler');
const CIManager = require('../../services/ci-manager');

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  const buildId = await CIManager.run({ mainBranch: req.params.commitHash });
  res.status(200).json({ buildId });
});
