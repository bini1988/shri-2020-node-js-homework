const assert = require('chai').assert;

describe('settings page', function() {
    it('should find setting page h1 title', function() {
        return this.browser
            .url('http://127.0.0.1:3030/')
            .getText('h1')
            .then(function(title) {
                assert.equal(title, 'School CI server')
            });
    });
});
