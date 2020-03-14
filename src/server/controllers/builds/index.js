const getBuilds = require('./get-builds');
const postBuildByCommit = require('./post-build-by-commit');
const getBuildById = require('./get-build-by-id');
const getBuildLogsById = require('./get-build-logs-by-id');

module.exports = {
  getBuilds,
  postBuildByCommit,
  getBuildById,
  getBuildLogsById,
};
