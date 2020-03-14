const express = require('express');
const {
  getBuilds,
  postBuildByCommit,
  getBuildById,
  getBuildLogsById,
} = require('../../controllers/builds');

const router = express.Router();

router.get('/builds', getBuilds);
router.post('/builds/:commitHash', postBuildByCommit);
router.get('/builds/:buildId', getBuildById);
router.get('/builds/:buildId/logs', getBuildLogsById);

module.exports = router;
