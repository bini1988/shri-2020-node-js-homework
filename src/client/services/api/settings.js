/* eslint-disable import/prefer-default-export */
import axios from './axios';

/**
 * Получить пользовательские настройки
 * @return {Promise}
 */
export function fetchSettings() {
  return axios.get('/settings');
}

/**
 * Сохранить настройки
 * @param {Object} values Объект настроек
 * @return {Promise}
 */
export function saveSettings(values) {
  return axios.post('/settings', values);
}
