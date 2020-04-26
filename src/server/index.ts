import express from 'express';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import cors from 'cors';
import logger from './services/logger';
import useRoutes from './routes';
import CIManager from './services/ci-manager';
import api from './services/ci-api';

const TMP_DIR = process.env.TMP_DIR || 'tmp';
const STATIC_FOLDER = process.env.SERVER_STATIC_FOLDER || 'static';
const HOST_NAME = process.env.SERVER_HOST || '127.0.0.1';
const PORT = parseInt(process.env.SERVER_PORT || '', 10) || 3030;

export const app = express();

app.locals.api = api;

app.set('views', './src/server/views');
app.set('view engine', 'ejs');

app.use(express.static(STATIC_FOLDER));
app.use(bodyParser.json());
app.use(cors())

useRoutes(app);

if (process.env.API_TOKEN === 'API_AUTH_TOKEN') {
  logger.error(
    'Api auth token hash to .env file under key of API_TOKEN is required',
  );
}

/**
 * Инициализация и запуск сервера
 */
export async function run() {
  const tmp = path.join(process.cwd(), TMP_DIR);

  if (!fs.existsSync(tmp)) {
    fs.mkdirSync(tmp);
  }
  const { data: settings } = await api.Settings.fetch();

  app.locals.ci = new CIManager({ settings, tmp });

  app.listen(PORT, HOST_NAME, () => {
    logger.info(`Server was successfully started at ${HOST_NAME}:${PORT}`);
  });
}
