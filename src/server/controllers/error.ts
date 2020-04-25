import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';
import AppError from '../services/errors/app-error';

export function handleErrors(error: AppError, req: Request, res: Response, next: NextFunction) {
  logger.error(`Error [${req.method}] '${req.url}': ${error.toString()}`);
  logger.error(error.stack || '');
  res.status(error.status).json({
    error: error.type,
    message: error.message,
  });
}
