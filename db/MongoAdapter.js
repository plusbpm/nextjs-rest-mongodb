const { MongoClient } = require('mongodb');

class MongoAdapter {
  constructor(connectUrl, options) {
    this.mongoClient = new MongoClient(connectUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...options,
    });
  }

  async init() {
    await this.mongoClient.connect();
  }
}

module.exports = MongoAdapter;
