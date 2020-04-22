const _ = require('lodash');
const api = require('../../src/server/services/ci-api');
const mockSettings = require('../../mocks/settings');

/**
 * Создать набор настроеки CI системы если они еще не были созданы
 * @param {Object} settings Объект настроек
 */
async function ensureCISettings(settings = mockSettings) {
  const data = await api.Settings.fetch();

  if (_.isEmpty(data.data)) {
    await api.Settings.save(settings);
  }
}

module.exports = ensureCISettings;
