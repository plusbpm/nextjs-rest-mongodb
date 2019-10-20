const deburr = require('lodash/deburr');
const trim = require('lodash/trim');
const flow = require('lodash/flow');

module.exports = flow([trim, deburr]);
