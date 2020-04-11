const express = require('express');
const apiRouter = require('./api');
const { handleCors } = require('../controllers/cors');
const { handleLogging } = require('../controllers/logging');
const { handleIndex } = require('../controllers/index');
const { handle404Error } = require('../controllers/error-404');
const { handleErrors } = require('../controllers/error');

const indexRouter = express.Router();

indexRouter.get('/build/:buildId', handleIndex);
indexRouter.get('/*', handleIndex);

module.exports = (app) => {
  app.use(handleCors);
  app.use(handleLogging);
  app.use(apiRouter);
  app.use(indexRouter);
  app.use(handle404Error);
  app.use(handleErrors);
};
