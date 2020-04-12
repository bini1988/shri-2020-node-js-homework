module.exports = {
  sets: {
    desktop: {
      files: 'tests/e2e'
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },
  prepareBrowser: function(browser) {
    browser.addCommand(
      'deleteCISettings', require('./hermione/commands/delete-settings')
    );
    browser.addCommand(
      'createCISettings', require('./hermione/commands/create-settings')
    );
  }
};
