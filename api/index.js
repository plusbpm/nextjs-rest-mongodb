const { MongoClient } = require('mongodb');

const apiRoutes = require('./routes');

const connectUrl = process.env.MONGODB_URL;
const apiRoot = process.env.API_ROOT;
const mongoClient = new MongoClient(connectUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async server => {
  await mongoClient.connect();
  const mongodb = mongoClient.db();

  server.register(apiRoutes, { prefix: apiRoot, mongodb });

  return server;
};
