
/**
 * Добавление сборки в очередь
 */
function postBuildByCommit(req, res) {
  const { commitHash } = req.params;

  res.status(200).json({ message: `get-build-by-commit-${commitHash}` });
}

module.exports = postBuildByCommit;
