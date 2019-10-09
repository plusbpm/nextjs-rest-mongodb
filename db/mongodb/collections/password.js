async function findByUserId(collection, userId) {
  const passDoc = await collection.findOne({ userId });
  return passDoc;
}

async function insert(collection, userId, data) {
  const result = await collection.updateOne(
    { userId },
    { $set: { userId, ...data } },
    { upsert: true },
  );
  return result;
}

module.exports = {
  findByUserId,
  insert,
};
