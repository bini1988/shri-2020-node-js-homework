const api = require('../../src/server/services/ci-api');
const mockSettings = require('../../mocks/settings');

/**
 * Создать набор настроеки CI системы
 * @param {Object} settings Объект настроек
 */
async function createCISettings(settings = mockSettings) {
  return api.Settings.save(settings);
}

module.exports = createCISettings;
