/* eslint-disable import/prefer-default-export */
import axios from './axios';

/**
 * Получить список билдов
 * @param {Number} offset Смещение от начала списка
 * @param {Number} limit Количество возвращаемых элементов
 * @return {Promise}
 */
export function fetchBuilds(offset, limit) {
  return axios.get('/builds', { params: { offset, limit } });
}
