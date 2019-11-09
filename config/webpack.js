require('../config/dotenv');

const { EnvironmentPlugin } = require('webpack');
const merge = require('webpack-merge');
const pick = require('lodash/pick');

const pickKeys = ['API_ROOT', 'WEBSOCKET_ROOT'];
const publicKeys = pick(process.env, pickKeys);
const { API_DOMAIN_CLIENT, API_DOMAIN_SERVER } = process.env;

module.exports = (config, { isServer }) =>
  merge(
    {
      plugins: [
        new EnvironmentPlugin({
          ...publicKeys,
          API_DOMAIN: isServer ? API_DOMAIN_SERVER : API_DOMAIN_CLIENT,
        }),
      ],
    },
    config,
  );
