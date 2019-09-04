const { MongoClient } = require('mongodb');

const connectUrl = process.env.MONGODB_URL;
const mongoClient = new MongoClient(connectUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async server => {
  await mongoClient.connect();

  const db = mongoClient.db();

  server.get('/api/test', async (req, res) => {
    await db.createCollection('test2');
    res.send({ uha: Math.random() });
  });

  return server;
};
