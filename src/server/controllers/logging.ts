import { Request, Response, NextFunction } from 'express';
import logger from '../services/logger';

export function handleLogging(req: Request, res: Response, next: NextFunction) {
  logger.info(`[${req.method}] ${req.url}`);
  next();
}
