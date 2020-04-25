/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Api from '../../services/ci-api';

/**
 * Получение сохраненных настроек
 */
export default asyncHandler(async (req: Request, res: Response) => {
  const api = req.app.locals.api as typeof Api;
  const { data } = await api.Settings.fetch();
  res.status(200).json({ data });
});
