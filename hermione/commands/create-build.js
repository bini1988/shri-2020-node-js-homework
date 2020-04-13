const api = require('../../src/server/services/ci-api');
const mockBuild = require('../mocks/build');

/**
 * Создать сборку
 * @param {Object} settings Объект сборки
 */
async function createCIBuild(build = mockBuild) {
  return api.Build.queueBuild(build)
    .then(({ data }) => data)
    .then(({ data = {} }) => data);
}

module.exports = createCIBuild;
