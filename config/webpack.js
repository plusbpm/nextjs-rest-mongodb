// eslint-disable-next-line import/no-extraneous-dependencies
const { EnvironmentPlugin } = require('webpack');
const pick = require('lodash/pick');

const pickKeys = ['API_ROOT_CLIENT'];
const publicKeys = pick(process.env, pickKeys);

module.exports = {
  plugins: [new EnvironmentPlugin(publicKeys)],
};
