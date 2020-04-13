const assert = require('chai').assert;

describe('Страница сборки', function() {
  beforeEach(async function () {
    this.url = 'http://127.0.0.1:3030/build';
  });
  afterEach(async function () {
    return this.browser.deleteCISettings();
  });

  it('Осуществляется переход на страницу сборки', async function() {
    await this.browser.createCISettings();
    const { id } = await this.browser.createCIBuild();

    return this.browser
      .url(`${this.url}/${id}`)
      .isExisting('[data-test="build-details-page"]')
      .then(assert.isTrue);
  });
});
