import express from 'express';
import { getBuilds, postBuildByCommit, getBuildById, getBuildLogsById } from '../../controllers/builds';

const router = express.Router();

router.get('/builds', getBuilds);
router.post('/builds/:commitHash', postBuildByCommit);
router.get('/builds/:buildId', getBuildById);
router.get('/builds/:buildId/logs', getBuildLogsById);

export default router;
