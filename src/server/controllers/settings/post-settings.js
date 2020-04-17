/* eslint-disable prefer-destructuring */
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');

/**
 * @typedef {import('./../../services/ci-manager')} CIManager
 * @typedef {import('./../../services/ci-api')} Api
 */

/**
 * Валидирует и возвращает переданные поля формы настроек
 * @param {Object} body Тело запроса
 * @return {Object}
 */
function parseSettings(body) {
  const { repoName, buildCommand } = body;
  const mainBranch = body.mainBranch || 'master';
  const period = body.period || 0;

  if (!_.isString(repoName) || _.isEmpty(repoName)) {
    throw new ValidationError('The name of the repo is required');
  }
  if (!_.isString(buildCommand) || _.isEmpty(buildCommand)) {
    throw new ValidationError('The build command is required');
  }
  if (!_.isString(mainBranch)) {
    throw new ValidationError('The main branch is invalid');
  }

  const periodVal = parseInt(period, 10);

  if (!_.isInteger(periodVal) || (periodVal < 0)) {
    throw new ValidationError('The period must be positive integer value');
  }

  return {
    repoName, buildCommand, mainBranch, period: periodVal,
  };
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
  const build = await ci.setup(settings);

  res.status(200).json({ data: { settings, build } });
});
