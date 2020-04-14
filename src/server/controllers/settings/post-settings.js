/* eslint-disable prefer-destructuring */
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');

/**
 * @typedef {import('./../../services/ci-manager')} CIManager
 * @typedef {import('./../../services/ci-api')} Api
 */

/**
 * Возвращает переданные настройки
 * @param {Object} body Тело запроса
 */
function parseSettings(body) {
  const settings = {};

  ['repoName', 'buildCommand'].forEach((param) => {
    const paramValue = body[param];

    if (!_.isString(paramValue) || _.isEmpty(paramValue)) {
      throw new ValidationError(`Invalid [${param}] request parameter`);
    }
    settings[param] = paramValue;
  });

  const { mainBranch = 'master' } = settings;

  settings.mainBranch = mainBranch;

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
  /**
   * @type {CIManager}
   */
  const ci = req.app.locals.ci;
  /**
   * @type {Api}
   */
  const api = req.app.locals.api;
  const settings = parseSettings(req.body);

  await api.Settings.save(settings);

  const data = await ci.setup(settings);

  res.status(200).json({ data });
});
