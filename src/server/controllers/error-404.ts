import { Request } from 'express';
import NotFoundError from '../services/errors/not-found-error';

export function handle404Error(req: Request) {
  throw new NotFoundError(`[${req.method}] ${req.url}`);
}
