/* eslint-disable import/prefer-default-export */
import axios from './axios';

/**
 * Получить настройки CI
 */
export function fetchSettings() {
  return axios.get<CI.Settings>('/settings');
}

/**
 * Сохранить настройки CI
 */
export function saveSettings(values: Partial<CI.Settings>) {
  return axios.post<{ settings: CI.Settings }>('/settings', values);
}
