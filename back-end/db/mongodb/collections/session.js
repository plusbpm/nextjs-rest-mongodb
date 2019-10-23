async function insert(collection, sessionId, data) {
  const result = await collection.insertOne({ _id: sessionId, ...data, created: new Date() });
  return result;
}

async function remove(collection, sessionId) {
  const result = await collection.deleteOne({ _id: sessionId });
  return result;
}

async function findById(collection, sessionId) {
  const result = await collection.findOne({ _id: sessionId });
  return result;
}

async function touch(collection, sessionId) {
  const result = await collection.updateOne({ _id: sessionId }, { $set: { created: new Date() } });
  return result;
}

module.exports = {
  insert,
  remove,
  findById,
  touch,
};
