import express, { Express } from 'express';
import apiRouter from './api';
import { handleLogging } from '../controllers/logging';
import { handleIndex } from '../controllers/index';
import { handle404Error } from '../controllers/error-404';
import { handleErrors } from '../controllers/error';

const indexRouter = express.Router();

indexRouter.get('/build/:buildId', handleIndex);
indexRouter.get('/*', handleIndex);

export default (app: Express) => {
  app.use(handleLogging);
  app.use(apiRouter);
  app.use(indexRouter);
  app.use(handle404Error);
  app.use(handleErrors);
};
