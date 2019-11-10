/* eslint-disable */
const handleWebpackConfig = require('./config/webpack.js');

module.exports = {
  distDir: '../.next',
  webpack: handleWebpackConfig,
};
