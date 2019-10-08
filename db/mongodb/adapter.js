const { MongoClient } = require('mongodb');
const upperFirst = require('lodash/upperFirst');

const collections = require('./collections');

class MongoAdapter {
  constructor(connectUrl, options) {
    this.mongoClient = new MongoClient(connectUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ...options,
    });
    Object.entries(collections).forEach(([collectionName, methods]) =>
      Object.entries(methods).forEach(([methodName, method]) =>
        this.attachMethod(collectionName, methodName, method),
      ),
    );
  }

  attachMethod(collectionName, methodName, method) {
    const attachMethodName = `${collectionName}${upperFirst(methodName)}`;
    this[attachMethodName] = async (...args) => {
      if (!this.inited) {
        await this.init();
      }
      const collection = this.db.collection(collectionName);
      return method(collection, ...args);
    };
  }

  async init() {
    await this.mongoClient.connect();
    this.db = this.mongoClient.db();
    this.inited = true;
  }
}

module.exports = MongoAdapter;
