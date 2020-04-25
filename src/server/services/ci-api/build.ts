import axios from './axios';

/**
 * Получить список сборок
 */
export function fetchBuilds(offset?: number, limit?: number) {
  const params = { offset, limit };
  return axios.get<{ data: CI.Build[] }>('/build/list', { params })
    .then(({ data }) => data);
}

/**
 * Получить сбороку
 */
export function fetchBuild(buildId: string) {
  const params = { buildId };
  return axios.get<{ data: CI.Build }>('/build/details', { params })
    .then(({ data }) => data);
}

export function fetchBuildOrUndefined(buildId: string) {
  return fetchBuild(buildId).catch(error => ({ data: undefined }));
}

/**
 * Получить лог для сбороки
 */
export function fetchBuildLog(buildId: string) {
  return axios.get('/build/log', { params: { buildId } });
}

export type QueueBuildParams = {
  commitMessage: string;
  commitHash: string;
  branchName: string;
  authorName: string;
};

export type QueueBuildResponce = {
  id: string;
  buildNumber: number;
  status: CI.BuildStatus;
};

/**
 * Поставить сборку в очередь выполнения
 */
export function queueBuild(params: QueueBuildParams) {
  return axios.post<{ data: QueueBuildResponce }>('/build/request', params)
    .then(({ data }) => data);
}

export type StartBuildParams = {
  buildId: string;
  dateTime: number;
};

/**
 * Сборка начала выполненние
 */
export function startBuild(params: StartBuildParams) {
  return axios.post('/build/start', params);
}

export type FinishBuildParams = {
  buildId: string;
  duration: number;
  success: boolean;
  buildLog: string;
};

/**
 * Завершение сборки
 */
export function finishBuild(params: FinishBuildParams) {
  return axios.post('/build/finish', params);
}

/**
 * Отменить сборку
 */
export function cancelBuild(buildId: string) {
  return axios.post('/build/cancel', { buildId });
}
