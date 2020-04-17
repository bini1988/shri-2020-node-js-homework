import Api from '../../api';
import { fetchBuilds } from './builds';

export const SETTINGS_STORAGE_KEY = 'settings';
export const STORE_SETTINGS = '@builds/STORE_SETTINGS';

/**
 * @param {Object} state Глобальный объект redux store
 * @returns {typeof initialState}
 */
export const getSettingsState = (state) => state[SETTINGS_STORAGE_KEY];

/**
 * Получить настройки
 * @param {Object} state Глобальный объект redux store
 */
export const getSettingsValues = (state) => getSettingsState(state).values;

/**
 * Получить наименование репозитория
 * @param {Object} state Глобальный объект redux store
 */
export const getSettingOfRepoName = (state) => {
  const settings = getSettingsValues(state);
  return settings && settings.repoName;
};

/**
 * Сохранить настройки
 * @param {Object[]} payload
 */
export function storeSettings(payload) {
  return { type: STORE_SETTINGS, payload };
}

/**
 * Получить настройки
 * @return {Promise}
 */
export function fetchSettings() {
  return (dispatch) => Api.Settings.fetchSettings()
    .then(({ data }) => { dispatch(storeSettings(data)); });
}

/**
 * Сохранить настройки
 * @param {Object} values Объект настроек
 * @return {Promise}
 */
export function saveSettings(values) {
  return (dispatch) => Api.Settings.saveSettings(values)
    .then(({ data }) => { dispatch(storeSettings(data)); });
}

/**
 * Применить настройки
 * @param {Object} values Объект настроек
 * @return {Promise}
 */
export function applySettings(values) {
  return (dispatch) => dispatch(saveSettings(values))
    .then(() => { dispatch(fetchBuilds()); });
}

export const initialState = {
  /** Объект настроек */
  values: undefined,
};

export default function (state = initialState, action) {
  switch (action.type) {
  case STORE_SETTINGS:
    return { ...state, values: action.payload };
  default:
    return state;
  }
}
