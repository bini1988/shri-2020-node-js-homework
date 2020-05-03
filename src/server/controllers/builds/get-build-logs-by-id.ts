/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../../services/errors/not-found-error';
import CIManager from '../../services/ci-manager';

/**
 * Получение логов билда о конкретной сборке
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const { buildId } = req.params;
  const ci = req.app.locals.ci as CIManager;

  try {
    const data = await ci.logs.fetchLogsByBuildId(buildId);

    res.status(200).json({ data });
  } catch (error) {
    throw new NotFoundError(`Log of build with id '${buildId}' is not found`);
  }
});
