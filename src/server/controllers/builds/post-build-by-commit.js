const asyncHandler = require('express-async-handler');
const CIManager = require('../../services/ci-manager');

/**
 * Добавление сборки в очередь
 */
module.exports = asyncHandler(async (req, res) => {
  CIManager.run({ mainBranch: req.params.commitHash });
  res.status(200).end();
});
