const axios = require('./axios');

/**
 * Работа с настройками CI
 */
module.exports = {
  /**
   * Получить настройки
   */
  fetch() {
    return axios.get('/conf');
  },
  /**
   * Сохранить настройки
   * @param {Object} settings Объект параметров
   * @param {string} settings.repoName Имя репозитория
   * @param {string} settings.buildCommand Команда для сборки
   * @param {string} settings.mainBranch Ветка для сборки
   * @param {number} settings.period Период мониторига состояния репозитория
   */
  save(settings) {
    return axios.post('/conf', settings);
  },
  /**
   * Удалить сохраненные настройки
   */
  remove() {
    return axios.delete('/conf');
  },
};
