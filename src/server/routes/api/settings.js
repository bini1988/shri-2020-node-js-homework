const express = require('express');
const { getSettings, postSettings, deleteSettings } = require('../../controllers/settings');

const router = express.Router();

router.get('/settings', getSettings);
router.post('/settings', postSettings);
router.delete('/settings', deleteSettings);

module.exports = router;
