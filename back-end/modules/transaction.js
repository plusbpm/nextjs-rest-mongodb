async function create(db, senderID, recipientID, amount) {
  await db.transactionCreate({ senderID, recipientID, amount });
}

module.exports = {
  create,
};
