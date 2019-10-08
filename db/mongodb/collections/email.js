async function findByLabel(collection, label) {
  const emailDoc = await collection.findOne({ label });
  return emailDoc;
}

async function upsert(collection, label, data) {
  const result = await collection.update({ label }, { $set: { label, ...data } }, { upsert: true });
  return result;
}

module.exports = {
  findByLabel,
  upsert,
};
