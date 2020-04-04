const _ = require('lodash');
const asyncHandler = require('express-async-handler');
const ValidationError = require('../../services/errors/validation-error');
const api = require('../../services/ci-api');

/**
 * Получение списка сборок
 */
module.exports = asyncHandler(async (req, res) => {
  const offset = !_.isUndefined(req.query.offset)
    ? parseInt(req.query.offset, 10) : 0;
  const limit = !_.isUndefined(req.query.limit)
    ? parseInt(req.query.limit, 10) : 25;

  if (!_.isInteger(offset)) {
    throw new ValidationError('Invalid [offset] query parameter');
  }
  if (!_.isInteger(limit)) {
    throw new ValidationError('Invalid [limit] query parameter');
  }
  const { data } = await api.Build.fetchBuilds(offset, limit);

  res.status(200).json(data);
});
