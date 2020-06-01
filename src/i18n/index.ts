import { InitOptions } from 'i18next';

export const i18nextOptions: InitOptions = {
  ns: ['translation'],
  defaultNS: 'translation',
  fallbackLng: false,
  nsSeparator: false,
  load: 'languageOnly',
  pluralSeparator: '__',
  contextSeparator: '__',
  interpolation: {
    escapeValue: false
  },
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json'
  },
  detection: {
    lookupCookie: 'i18next',
    lookupLocalStorage: 'i18nextLng',
    caches: ['cookie', 'localStorage'],
    order: ['cookie', 'localStorage', 'navigator']
  },
};
