const express = require('express');
const { getSettings, postSettings } = require('../../controllers/settings');

const router = express.Router();

router.get('/settings', getSettings);
router.post('/settings', postSettings);

module.exports = router;
