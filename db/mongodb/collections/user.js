const { convertToObjectId } = require('../util');

async function insert(collection, data) {
  const result = await collection.insertOne(data);
  return result;
}

async function findById(collection, id) {
  const userDoc = await collection.findOne({ _id: convertToObjectId(id) });
  return userDoc;
}

module.exports = {
  findById,
  insert,
};
