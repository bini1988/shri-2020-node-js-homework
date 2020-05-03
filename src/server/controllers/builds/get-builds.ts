/* eslint-disable prefer-destructuring */
import _ from 'lodash';
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ValidationError from '../../services/errors/validation-error';
import Api from '../../services/ci-api';

function parseQuery(query: Query) {
  const offset = _.isString(query.offset)
    ? parseInt(query.offset, 10) : undefined;
  const limit = _.isString(query.limit)
    ? parseInt(query.limit, 10) : undefined;

  if (!_.isUndefined(offset) && (!_.isInteger(offset) || (offset < 0))) {
    throw new ValidationError('Offset query parameter should be positive integer');
  }
  if (!_.isUndefined(limit) && (!_.isInteger(limit) || (limit < 0))) {
    throw new ValidationError('Limit query parameter should be positive integer');
  }
  return { offset, limit };
}

/**
 * Получение списка сборок
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const { offset, limit } = parseQuery(req.query);
  const api = req.app.locals.api as typeof Api;
  const { data } = await api.Build.fetchBuilds(offset, limit);

  res.status(200).json({ data });
});
