/* eslint-disable prefer-destructuring */
const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');

/**
 * @typedef {import('./../../services/ci-api')} Api
 */

/**
 * Возвращет параметры запроса
 * @param {Object} query
 */
function parseQuery(query = {}) {
  const offset = !_.isUndefined(query.offset)
    ? parseInt(query.offset, 10) : undefined;
  const limit = !_.isUndefined(query.limit)
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
module.exports = asyncHandler(async (req, res) => {
  const { offset, limit } = parseQuery(req.query);
  /**
   * @type {Api}
   */
  const api = req.app.locals.api;
  const { data } = await api.Build.fetchBuilds(offset, limit);

  res.status(200).json({ data });
});
