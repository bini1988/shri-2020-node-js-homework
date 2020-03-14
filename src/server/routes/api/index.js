const express = require('express');
const settingsRouter = require('./settings');
const buildsRouter = require('./builds');

const router = express.Router();

router.use('/api', settingsRouter, buildsRouter);

module.exports = router;
