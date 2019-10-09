const { convertToObjectId } = require('../util');

async function findByLabel(collection, label) {
  const emailDoc = await collection.findOne({ label });
  return emailDoc;
}

async function findOne(collection, id) {
  const emailDoc = await collection.findOne({ _id: convertToObjectId(id) });
  return emailDoc;
}

async function upsert(collection, label, data) {
  const result = await collection.updateOne(
    { label },
    { $set: { ...data, label } },
    { upsert: true },
  );
  return result;
}

module.exports = {
  findByLabel,
  findOne,
  upsert,
};
