const assert = require('chai').assert;
const mockSettings =require('../../mocks/settings');

describe('Страница настроек', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/settings';
    await this.browser.deleteCISettings();
  });

  it('Осуществляется переход на страницу настроек', function() {
    return this.browser
      .url(this.url)
      .isExisting('[data-test="settings-page"]')
      .then(assert.isTrue);
  });
  it('Отображается форма настроек', function() {
    return this.browser
      .url(this.url)
      .waitForVisible('[data-test="settings-page"]', 3000)
      .isExisting('[data-test="settings-form"]')
      .then(assert.isTrue);
  });
  it('Форму нельзя отправить если не заполнены обязательные поля', function() {

    return this.browser
      .url(this.url)
      .waitForVisible('[data-test="settings-page"]')
      .$('[data-test="settings-form"] [data-test="submit"]')
      .getAttribute('disabled')
      .then(value => assert.equal(value, 'true'));
  });
  it('Отправка формы после заполнения полей', async function() {
    await this.browser
      .url(this.url)
      .waitForVisible('[data-test="settings-page"]');

    await this.browser
      .$('[data-test="repoName"] [data-test="input"]')
      .setValue(mockSettings.repoName);

    await this.browser
      .$('[data-test="buildCommand"] [data-test="input"]')
      .setValue(mockSettings.buildCommand);

    await this.browser
      .$('[data-test="mainBranch"] [data-test="input"]')
      .setValue(mockSettings.mainBranch);

    await this.browser
      .$('[data-test="period"] [data-test="input"]')
      .setValue(mockSettings.period);

    await this.browser
      .$('[data-test="settings-form"] [data-test="submit"]')
      .getAttribute('disabled')
      .then(value => assert.equal(value, null));

    await this.browser
      .$('[data-test="settings-form"] [data-test="submit"]')
      .click()
      .waitForVisible('[data-test="build-history-page"]', 5000)
      .isExisting('[data-test="build-history-page"]')
      .then(assert.isTrue);
  });
});
