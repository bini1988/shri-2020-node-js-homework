/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../services/errors/not-found-error';
import Api from '../../services/ci-api';

/**
 * Получение информации о конкретной сборке
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const { buildId } = req.params;
  const api = req.app.locals.api as typeof Api;

  try {
    const { data } = await api.Build.fetchBuild(buildId);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Build with id '${buildId}' is not found`);
  }
});
