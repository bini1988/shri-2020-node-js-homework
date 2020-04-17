const assert = require('chai').assert;

describe('Страница сборки', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/build';
    await this.browser.deleteCISettings();
    await this.browser.createCISettings();
  });

  it('Осуществляется переход на страницу сборки', async function() {
    const { id } = await this.browser.createCIBuild();

    return this.browser
      .url(`${this.url}/${id}`)
      .isExisting('[data-test="build-details-page"]')
      .then(assert.isTrue);
  });
  it('Осуществляется переход со страницы сборки на страницу настроек', async function() {
    const { id } = await this.browser.createCIBuild();

    await this.browser
      .url(`${this.url}/${id}`)
      .waitForVisible('[data-test="build-details-page"]', 3000)
      .isExisting('[data-test="btn-settings"]')
      .then(assert.isTrue);

    return this.browser
      .$('[data-test="btn-settings"]').click()
      .waitForVisible('[data-test="settings-page"]', 3000)
      .isExisting('[data-test="settings-page"]')
      .then(assert.isTrue);
  });
  it('На странице сборки отображается карточка сборки', async function() {
    await this.browser.createCISettings();
    const { id } = await this.browser.createCIBuild();

    return this.browser
      .url(`${this.url}/${id}`)
      .waitForVisible('[data-test="build-details-page"]', 3000)
      .isExisting(`[data-test="build-card"][data-id="${id}"]`)
      .then(assert.isTrue);
  });
  it('Осуществляется переход на страницу новой сборки при нажатии на кнопку "Rebuild"', async function() {
    const build = await this.browser.createCIBuild();

    await this.browser
      .url(`${this.url}/${build.id}`)
      .waitForVisible('[data-test="build-details-page"]', 5000)
      .isExisting('[data-test="btn-rebuild"]')
      .then(assert.isTrue);

    const hash = await this.browser
      .getText('[data-test="build-card"] [data-test="hash"]');
    const buildId = await this.browser
      .$('[data-test="build-card"]').getAttribute('data-id');

    await this.browser
      .$('[data-test="btn-rebuild"]').click()
      // Ждем перехода к карточке новой сборки
      .waitUntil(() => this.browser
        .$('[data-test="build-card"]').getAttribute('data-id')
        .then(id => id !== buildId), 5000)
      .isExisting('[data-test="build-card"]')
      .then(assert.isTrue);

    // Новая сбока должна иметь такой же hash
    await this.browser
      .getText('[data-test="build-card"] [data-test="hash"]')
      .then(text => assert.equal(text, hash));
  });
});
