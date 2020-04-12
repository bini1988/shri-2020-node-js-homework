const assert = require('chai').assert;

describe('Главная страница', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/';
  });

  it('Если настройки не заданы, должна открываться стартовая страница', async function() {
    return this.browser
      .deleteCISettings()
      .url(this.url)
      .isExisting('[data-test="main-page"]')
      .then(assert.isTrue);
  });
  it('Если настройки заданы, должна открываться история сборок', async function() {
    return this.browser
      .createCISettings()
      .url(this.url)
      .isExisting('[data-test="build-history-page"]')
      .then(assert.isTrue);
  });
});
