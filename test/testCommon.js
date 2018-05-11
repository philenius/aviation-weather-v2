'use strict';

const assert = require('assert');
require('../app/common/common');

describe('String.prototype.capitalize in common.js', () => {

    it('should make the first letter uppercase', () => {
        assert.equal('john'.capitalize(), 'John');
    });

});
