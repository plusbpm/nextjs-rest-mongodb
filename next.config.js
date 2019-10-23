/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer');
const flow = require('lodash/flow');

const handleWebpackConfig = require('./config/webpack.js');

const enhance = flow(withBundleAnalyzer);

module.exports = enhance({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../analyze/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../analyze/client.html',
    },
  },
  distDir: '../.next',
  webpack: handleWebpackConfig,
});
