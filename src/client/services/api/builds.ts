/* eslint-disable import/prefer-default-export */
import axios from './axios';

/**
 * Получить список билдов
 */
export function fetchBuilds(offset?: number, limit?: number) {
  return axios.get<Array<CI.Build>>('/builds', { params: { offset, limit } });
}

/**
 * Получить билд по его индентификатору
 */
export function fetchBuildById(id: string) {
  return axios.get<CI.Build>(`/builds/${id}`);
}

/**
 * Получить логи билда по его индентификатору
 */
export function fetchBuildLogsById(id: string) {
  return axios.get<string>(`/builds/${id}/logs`);
}

/**
 * Поставить билд в очередь
 */
export function queueBuild(commitHash: string) {
  return axios.post(`/builds/${commitHash}`);
}
