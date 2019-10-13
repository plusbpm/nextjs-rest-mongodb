async function insert(collection, sessionId, data) {
  const result = await collection.insertOne({ _id: sessionId, ...data });
  return result;
}

async function remove(collection, sessionId) {
  const result = await collection.deleteOne({ _id: sessionId });
  return result;
}

module.exports = {
  insert,
  remove,
};
