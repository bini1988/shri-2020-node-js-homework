/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ValidationError from '../../services/errors/validation-error';
import Api from '../../services/ci-api';
import CIManager from '../../services/ci-manager';

/**
 * Валидирует и возвращает переданные поля формы настроек
 * @param {Object} body Тело запроса
 * @return {Object}
 */
function parseSettings(body: Query) {
  const { repoName, buildCommand } = body;
  const mainBranch = body.mainBranch || 'master';
  const period = _.isString(body.period)
    ? parseInt(body.period, 10) : _.isNumber(body.period) ? body.period : 0;

  if (!_.isString(repoName) || _.isEmpty(repoName)) {
    throw new ValidationError('The name of the repo is required');
  }
  if (!_.isString(buildCommand) || _.isEmpty(buildCommand)) {
    throw new ValidationError('The build command is required');
  }
  if (!_.isString(mainBranch)) {
    throw new ValidationError('The main branch is invalid');
  }
  if (!_.isInteger(period) || (period < 0)) {
    throw new ValidationError('The period must be positive integer value');
  }
  return { repoName, buildCommand, mainBranch, period };
}

/**
 * Сохранение настроек
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const ci = req.app.locals.ci as CIManager;
  const api = req.app.locals.api as typeof Api;

  await api.Settings.save(parseSettings(req.body));
  const { data: settings } = await api.Settings.fetch();
  const build = await ci.setup(settings);

  res.status(200).json({ data: { settings, build } });
});
