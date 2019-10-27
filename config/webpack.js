require('../config/dotenv');

const { EnvironmentPlugin } = require('webpack');
const merge = require('webpack-merge');
const pick = require('lodash/pick');

const pickKeys = ['API_ROOT', 'API_DOMAIN'];
const publicKeys = pick(process.env, pickKeys);

module.exports = config =>
  merge(
    {
      plugins: [new EnvironmentPlugin(publicKeys)],
    },
    config,
  );
