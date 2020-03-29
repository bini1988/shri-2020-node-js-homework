/* eslint-disable import/prefer-default-export */
import axios from './axios';

/**
 * Получить пользовательские настройки
 * @return {Promise}
 */
export function fetchSettings() {
  return axios.get('/settings');
}
