require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./services/logger');
const applyRoutes = require('./routes');

const STATIC_FOLDER = process.env.SERVER_STATIC_FOLDER || 'static';
const HOST_NAME = process.env.SERVER_HOST || '127.0.0.1';
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

const app = express();

app.use(express.static(STATIC_FOLDER));
app.use(bodyParser.json());

applyRoutes(app);

app.listen(PORT, HOST_NAME, () => {
  logger.info(`Server was successfully started at ${HOST_NAME}:${PORT}`);
});

module.exports = { app };
