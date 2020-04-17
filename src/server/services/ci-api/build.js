const axios = require('./axios');

/**
 * Работа с CI сборками
 */
module.exports = {
  /**
   * Получить список сборок
   * @param {number} [offset]
   * @param {number} [limit]
   */
  fetchBuilds(offset = 0, limit = 9) {
    return axios.get('/build/list', { params: { offset, limit } });
  },
  /**
   * Получить сбороку
   * @param {string} buildId Индентификатор сборки
   */
  fetchBuild(buildId) {
    return axios.get('/build/details', { params: { buildId } });
  },
  /**
   * Получить лог для сбороки
   * @param {string} buildId Индентификатор сборки
   */
  fetchBuildLog(buildId) {
    return axios.get('/build/log', { params: { buildId } });
  },
  /**
   * Поставить сборку в очередь выполнения
   * @param {Object} params
   * @param {string} params.commitMessage Сообщение коммита
   * @param {string} params.commitHash Хэш коммита
   * @param {string} params.branchName Ветка для сборки
   * @param {string} params.authorName Автор коммита
   */
  queueBuild(params) {
    return axios.post('/build/request', params);
  },
  /**
   * Сборка начала выполненние
   * @param {Object} params
   * @param {string} params.buildId Индентификатор сборки
   * @param {string} params.dateTime Время начала сборки
   */
  startBuild(params) {
    return axios.post('/build/start', params);
  },
  /**
   * Завершение сборки
   * @param {Object} params
   * @param {string} params.buildId Индентификатор сборки
   * @param {number} params.duration Время потраченное на сборку
   * @param {boolean} params.success Упесшное завершенние сборки
   * @param {string} params.buildLog Лог сборки
   */
  finishBuild(params) {
    return axios.post('/build/finish', params);
  },
  /**
   * Отменить сборку
   * @param {string} buildId Индентификатор сборки
   */
  cancelBuild(buildId) {
    return axios.post('/build/cancel', { buildId });
  },
};
