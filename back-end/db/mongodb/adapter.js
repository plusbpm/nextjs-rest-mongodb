const { MongoClient } = require('mongodb');
const upperFirst = require('lodash/upperFirst');

const collections = require('./collections');
const indexes = require('./indexes');
const mocking = require('./mocking');

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
      if (!this.inited) await this.init();
      const collection = this.db.collection(collectionName);
      collection.mongoClient = this.mongoClient;
      return method(collection, ...args);
    };
  }

  async init() {
    await this.mongoClient.connect();
    this.db = this.mongoClient.db();
    const admin = this.db.admin();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        // eslint-disable-next-line no-await-in-loop
        const { members } = await admin.replSetGetStatus();
        const hasPrimaryState = members
          .map(({ stateStr }) => stateStr.toLowerCase())
          .includes('primary');
        if (!hasPrimaryState) throw new Error('No primary');

        // eslint-disable-next-line no-await-in-loop
        const { repl = {} } = await admin.serverStatus();
        const isMaster = repl.ismaster;
        if (!isMaster) throw new Error('No master');

        break;
      } catch (error) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise(rs => setTimeout(rs, 10));
      }
    }
    this.inited = true;
  }

  async createIndexes() {
    if (!this.inited) await this.init();
    return Promise.all(
      Object.keys(indexes).map(collectionName => {
        const collection = this.db.collection(collectionName);
        return collection.createIndexes(indexes[collectionName]);
      }),
    );
  }

  async mocking() {
    if (!this.inited) await this.init();
    await mocking(this);
  }
}

module.exports = MongoAdapter;
