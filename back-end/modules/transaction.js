async function create(db, senderID, recipientID, amount) {
  await db.transactionCreate({ senderID, recipientID, amount });
}

async function findOne(db, userId, transactionID) {
  return db.transactionFindById(userId, transactionID);
}

module.exports = {
  create,
  findOne,
};
