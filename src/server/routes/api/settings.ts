import express from 'express';
import { getSettings, postSettings, deleteSettings } from '../../controllers/settings';

const router = express.Router();

router.get('/settings', getSettings);
router.post('/settings', postSettings);
router.delete('/settings', deleteSettings);

export default router;
