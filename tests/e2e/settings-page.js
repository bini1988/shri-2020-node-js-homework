const assert = require('chai').assert;

describe('Страница настроек', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/settings';
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
      .waitForVisible('[data-test="settings-page"]')
      .isExisting('[data-test="settings-form"]')
      .then(assert.isTrue);
  });
});
