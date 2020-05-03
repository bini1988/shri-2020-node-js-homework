import express from 'express';
import settingsRouter from './settings';
import buildsRouter from './builds';

const router = express.Router();

router.use('/api', settingsRouter, buildsRouter);

export default router;
