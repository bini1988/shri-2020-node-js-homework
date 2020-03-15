const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');
const api = require('../../services/ci-api');

/**
 * Сохранение настроек
 */
module.exports = asyncHandler(async (req, res) => {
  const settings = {};

  ['repoName', 'buildCommand', 'mainBranch'].forEach((param) => {
    const paramValue = req.body[param];

    if (!_.isString(paramValue) || _.isEmpty(paramValue)) {
      throw new ValidationError(`Invalid [${param}] request parameter`);
    }
    settings[param] = paramValue;
  });

  const period = parseInt(req.body.period, 10);

  if (!_.isInteger(period) || (period <= 0)) {
    throw new ValidationError('Invalid [period] request parameter');
  }
  settings.period = period;

  await api.Settings.save(settings);

  res.status(200).end();
});
