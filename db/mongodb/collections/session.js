async function insert(collection, sessionId, data) {
  const result = await collection.insertOne({ _id: sessionId, ...data });
  return result;
}

module.exports = {
  insert,
};
