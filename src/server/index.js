require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./services/logger');
const useRoutes = require('./routes');
const CIManager = require('./services/ci-manager');
const api = require('./services/ci-api');

const STATIC_FOLDER = process.env.SERVER_STATIC_FOLDER || 'static';
const HOST_NAME = process.env.SERVER_HOST || '127.0.0.1';
const PORT = parseInt(process.env.SERVER_PORT, 10) || 3000;

module.exports = (async () => {
  const app = express();
  const { data: { data: settings } } = await api.Settings.fetch();

  app.locals.ci = new CIManager(settings);

  app.use(express.static(STATIC_FOLDER));
  app.use(bodyParser.json());

  useRoutes(app);

  app.listen(PORT, HOST_NAME, () => {
    logger.info(`Server was successfully started at ${HOST_NAME}:${PORT}`);
  });
})();
