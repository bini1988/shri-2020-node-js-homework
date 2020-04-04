const asyncHandler = require('express-async-handler');
const CIManager = require('../../services/ci-manager');

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  const mainBranch = req.params.commitHash;
  const data = await CIManager.run({ mainBranch });

  res.status(200).json({ data });
});
