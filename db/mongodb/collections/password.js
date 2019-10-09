async function findByHash(collection, hash) {
  const passDoc = await collection.findOne({ hash });
  return passDoc;
}

async function insert(collection, userId, hash) {
  const result = await collection.updateOne({ userId }, { userId, hash }, { upsert: true });
  return result;
}

module.exports = {
  findByHash,
  insert,
};
