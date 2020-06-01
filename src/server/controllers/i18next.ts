import path from 'path';
import i18next from 'i18next';
import FsBackend from 'i18next-fs-backend';
import i18nextHttpMiddleware from 'i18next-http-middleware';
import { i18nextOptions } from '../../i18n';

const STATIC_FOLDER = process.env.SERVER_STATIC_FOLDER || 'static';
const LOCALES_FOLDER = path.join(process.cwd(), STATIC_FOLDER, 'locales')

i18next
  .use(FsBackend)
  .use(i18nextHttpMiddleware.LanguageDetector)
  .init({
    ...i18nextOptions,
    preload: ['en', 'ru'],
    backend: { loadPath: LOCALES_FOLDER + '/{{lng}}/{{ns}}.json' },
  });

export const handleI18next = i18nextHttpMiddleware.handle(i18next);
