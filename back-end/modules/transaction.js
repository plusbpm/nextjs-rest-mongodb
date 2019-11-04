const { CABINET__LIST_PER_PAGE } = require('../../shared/constants');

async function create(db, senderID, recipientID, amount) {
  await db.transactionCreate({ senderID, recipientID, amount });
}

async function findOne(db, userId, transactionID) {
  return db.transactionFindById(userId, transactionID);
}

async function fetch(db, userId, { page, ...query }) {
  const pageNumber = page || 1;
  const skip = (pageNumber - 1) * CABINET__LIST_PER_PAGE;
  return db.transactionFetch(userId, query, skip, CABINET__LIST_PER_PAGE);
}

module.exports = {
  create,
  fetch,
  findOne,
};
