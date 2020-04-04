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

/**
 * Получить билд
 * @param {string} id Индентификатор билда
 * @return {Promise}
 */
export function fetchBuildById(id) {
  return axios.get(`/builds/${id}`);
}

/**
 * Получить логи билда
 * @param {string} id Индентификатор билда
 * @return {Promise}
 */
export function fetchBuildLogsById(id) {
  return axios.get(`/builds/${id}/logs`);
}

/**
 * Поставить билд в очередь
 * @param {string} [commitHash] Хэш коммита
 * @return {Promise}
 */
export function queueBuild(commitHash) {
  return axios.post(`/builds/${commitHash}`);
}
