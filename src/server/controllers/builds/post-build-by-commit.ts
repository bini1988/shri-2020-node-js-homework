/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CIManager from '../../services/ci-manager';

/**
 * Добавление сборки в очередь
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const ci = req.app.locals.ci as CIManager;
  const data = await ci.queueBuild(req.params.commitHash);

  res.status(200).json({ data });
});
