const api = require('./api');
const { handleLogging } = require('../controllers/logging');
const { handle404Error } = require('../controllers/error-404');
const { handleErrors } = require('../controllers/error');

module.exports = (app) => {
  app.use(handleLogging);
  app.use(api);
  app.use(handle404Error);
  app.use(handleErrors);
};
