const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');
const api = require('../../services/ci-api');
const CIManager = require('../../services/ci-manager');

/**
 * Возвращает переданные настройки
 * @param {Object} body Тело запроса
 */
function parseSettings(body) {
  const settings = {};

  ['repoName', 'buildCommand', 'mainBranch'].forEach((param) => {
    const paramValue = body[param];

    if (!_.isString(paramValue) || _.isEmpty(paramValue)) {
      throw new ValidationError(`Invalid [${param}] request parameter`);
    }
    settings[param] = paramValue;
  });

  const period = parseInt(body.period, 10);

  if (!_.isInteger(period) || (period <= 0)) {
    throw new ValidationError('Invalid [period] request parameter');
  }
  settings.period = period;

  return settings;
}

/**
 * Сохранение настроек
 */
module.exports = asyncHandler(async (req, res) => {
  const settings = parseSettings(req.body);

  await api.Settings.save(settings);

  CIManager.run(settings);

  res.status(200).end();
});
