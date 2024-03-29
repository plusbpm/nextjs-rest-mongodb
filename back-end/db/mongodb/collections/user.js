const { convertToObjectId } = require('../util');

async function insert(collection, data) {
  const result = await collection.insertOne(data);
  return result;
}

async function findById(collection, id) {
  const userDoc = await collection.findOne({ _id: convertToObjectId(id) });
  return userDoc;
}

// TODO: check security risk with criteria
async function findByName(collection, userId, criteria, limit) {
  const userDocs = await collection
    .find({ name: { $regex: criteria, $options: 'i' }, _id: { $ne: convertToObjectId(userId) } })
    .limit(limit)
    .toArray();
  return userDocs;
}

module.exports = {
  findById,
  findByName,
  insert,
};
