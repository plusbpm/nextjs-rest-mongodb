const MongoAdapter = require('./MongoAdapter');

const connectUrl = process.env.MONGODB_URL;

async function init() {
  const adapter = new MongoAdapter(connectUrl);
  await adapter.init();
  return adapter;
}

module.exports = { init };
