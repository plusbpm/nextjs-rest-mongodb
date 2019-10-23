const flow = require('lodash/flow');
const toLower = require('lodash/toLower');
const deburr = require('lodash/deburr');
const trim = require('lodash/trim');

const { convertToObjectId } = require('../util');

const prepareEmailLabel = flow([trim, deburr, toLower]);

async function findByLabel(collection, label) {
  const emailDoc = await collection.findOne({ label: prepareEmailLabel(label) });
  return emailDoc;
}

async function findOne(collection, id) {
  const emailDoc = await collection.findOne({ _id: convertToObjectId(id) });
  return emailDoc;
}

async function upsert(collection, label, data) {
  const result = await collection.updateOne(
    { label: prepareEmailLabel(label) },
    { $set: { ...data, label: prepareEmailLabel(label) } },
    { upsert: true },
  );
  return result;
}

module.exports = {
  findByLabel,
  findOne,
  upsert,
};
