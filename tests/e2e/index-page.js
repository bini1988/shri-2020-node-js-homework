const assert = require('chai').assert;

describe('Главная страница', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/';
    await this.browser.ensureCISettings();
  });

  it('Если настройки не заданы, должна открываться стартовая страница', async function() {
    await this.browser.deleteCISettings();

    return this.browser
      .url(this.url)
      .isExisting('[data-test="main-page"]')
      .then(assert.isTrue);
  });
  it('Если настройки заданы, должна открываться история сборок', async function() {
    return this.browser
      .url(this.url)
      .isExisting('[data-test="build-history-page"]')
      .then(assert.isTrue);
  });
  it('Осуществляется переход со страницы история сборок на страницу настроек', async function() {
    await this.browser
      .url(this.url)
      .waitForVisible('[data-test="build-history-page"]', 3000)
      .isExisting('[data-test="btn-settings"]')
      .then(assert.isTrue);

    return this.browser
      .$('[data-test="btn-settings"]').click()
      .waitForVisible('[data-test="settings-page"]', 3000)
      .isExisting('[data-test="settings-page"]')
      .then(assert.isTrue);
  });
  it('Запуск сборки с заданного коммита со страницы история сборок', async function() {
    await this.browser
      .url(this.url)
      .waitForVisible('[data-test="build-history-page"]', 3000)
      .isExisting('[data-test="btn-build"]')
      .then(assert.isTrue);

    const formQuery = '[data-test="new-build-form"]';

    await this.browser
      .$('[data-test="btn-build"]').click()
      .waitForVisible(formQuery, 300)
      .isExisting(formQuery)
      .then(assert.isTrue);

    await this.browser
      .$(`${formQuery} [data-test="commit"] [data-test="input"]`)
      .setValue('master');

    await this.browser
      .$(`${formQuery} [data-test="submit"]`).click()
      .waitForVisible('[data-test="build-details-page"]', 3000)
      .isExisting('[data-test="build-details-page"]')
      .then(assert.isTrue);
  });
});
