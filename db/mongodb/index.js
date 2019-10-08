const MongoAdapter = require('./adapter');

const connectUrl = process.env.MONGODB_URL;

const createAdapter = async options => {
  const adapter = new MongoAdapter(connectUrl, options);
  await adapter.init();
  return adapter;
};

module.exports = {
  createAdapter,
  MongoAdapter,
};
