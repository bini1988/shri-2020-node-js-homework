import axios from './axios';

/**
 * Получить настройки
 */
export async function fetch() {
  const { data } = await axios.get<{ data: CI.Settings }>('/conf');
  return data;
}

/**
 * Сохранить настройки
 */
export async function save(settings: CI.PostSettings) {
  const { data } = await axios.post('/conf', settings);
  return data;
}

/**
 * Удалить сохраненные настройки
 */
export function remove() {
  return axios.delete('/conf');
}
