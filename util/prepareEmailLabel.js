const flow = require('lodash/flow');
const toLower = require('lodash/toLower');
const cleanString = require('./cleanString');

module.exports = flow([cleanString, toLower]);
