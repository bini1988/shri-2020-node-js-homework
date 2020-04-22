const api = require('../../src/server/services/ci-api');

/**
 * Удалить настройки CI системы
 */
async function deleteCISettings() {
  return api.Settings.delete();
}

module.exports = deleteCISettings;
