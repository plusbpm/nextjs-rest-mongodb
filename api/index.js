const { MongoClient } = require("mongodb");

const connectUrl = process.env.MONGODB_URL;
const client = new MongoClient(connectUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

module.exports = async expressApp => {
  await client.connect();

  const db = client.db();

  expressApp.get("/api/test", async (req, res) => {
    await db.createCollection("test2");
    res.send("DONE");
  });

  return expressApp;
};
