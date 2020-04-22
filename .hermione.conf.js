module.exports = {
  sets: {
    desktop: {
      files: 'tests/e2e'
    }
  },
  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
      },
      retry: 3,
    }
  },
  prepareBrowser: function(browser) {
    browser.addCommand(
      'deleteCISettings', require('./hermione/commands/delete-settings')
    );
    browser.addCommand(
      'createCISettings', require('./hermione/commands/create-settings')
    );
    browser.addCommand(
      'ensureCISettings', require('./hermione/commands/ensure-settings')
    );
    browser.addCommand(
      'createCIBuild', require('./hermione/commands/create-build')
    );
  }
};
