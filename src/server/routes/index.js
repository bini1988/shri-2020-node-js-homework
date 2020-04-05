const api = require('./api');
const { handleCors } = require('../controllers/cors');
const { handleLogging } = require('../controllers/logging');
const { handleIndex } = require('../controllers/index');
const { handle404Error } = require('../controllers/error-404');
const { handleErrors } = require('../controllers/error');

module.exports = (app) => {
  app.use(handleCors);
  app.use(handleLogging);
  app.use(api);
  app.use(handleIndex);
  app.use(handle404Error);
  app.use(handleErrors);
};
