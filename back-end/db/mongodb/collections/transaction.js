const Big = require('big.js');

const { convertToObjectId, twoDigits } = require('../util');

const transactionOptions = {
  readConcern: { level: 'local' },
  writeConcern: { w: 'majority' },
};

async function create(collection, { senderID, recipientID, amount }) {
  const { mongoClient } = collection;
  const session = mongoClient.startSession();
  session.startTransaction(transactionOptions);

  try {
    const userCollection = mongoClient.db().collection('user');
    const transactionCollection = mongoClient.db().collection('transaction');

    const senderObjectID = convertToObjectId(senderID);
    const senderDoc = await userCollection.findOne({ _id: senderObjectID }, { session });
    if (!senderDoc) throw new Error('No sender data found');
    if (senderDoc.account < amount) throw new Error('Not enough PW');

    const recipientObjectID = convertToObjectId(recipientID);
    const recipientDoc = await userCollection.findOne({ _id: recipientObjectID }, { session });
    if (!recipientDoc) throw new Error('No recipient data found');

    const dt = new Date();

    const year = dt.getUTCFullYear();
    const month = dt.getUTCMonth() + 1;
    const day = dt.getUTCDate();
    const date = `${year}-${twoDigits(month)}-${twoDigits(day)}`;

    const senderResultAmount = Number(
      Big(senderDoc.account)
        .minus(Big(amount))
        .toFixed(2),
    );
    const { result: senderResult } = await transactionCollection.insertOne(
      {
        amount,
        account: senderResultAmount,
        userId: senderObjectID,
        incoming: false,
        correspondent: recipientDoc.name,
        correspondentID: recipientObjectID,
        dt,
        date,
      },
      { session },
    );
    if (senderResult.ok !== 1) throw new Error('Sender transaction create error');

    const recipientResultAmount = Number(
      Big(recipientDoc.account)
        .plus(Big(amount))
        .toFixed(2),
    );
    const { result: recipientResult } = await transactionCollection.insertOne(
      {
        amount,
        account: recipientResultAmount,
        userId: recipientObjectID,
        incoming: true,
        correspondent: senderDoc.name,
        correspondentID: senderObjectID,
        dt,
        date,
      },
      { session },
    );
    if (recipientResult.ok !== 1) throw new Error('Recipient transaction create error');

    const { modifiedCount: senderModifiedCount } = await userCollection.updateOne(
      { _id: senderObjectID, account: senderDoc.account },
      { $set: { account: senderResultAmount } },
      { session },
    );
    if (senderModifiedCount !== 1) throw new Error('Sender data competitive write error');

    const { modifiedCount: recipientModifiedCount } = await userCollection.updateOne(
      { _id: recipientObjectID, account: recipientDoc.account },
      { $set: { account: recipientResultAmount } },
      { session },
    );
    if (recipientModifiedCount !== 1) throw new Error('Recipient competitive write error');
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  await session.commitTransaction();
  await session.endSession();
}

async function findById(collection, uid, id) {
  const userId = convertToObjectId(uid);
  const transactionID = convertToObjectId(id);
  const transactionDoc = await collection.findOne({ _id: transactionID, userId });
  return transactionDoc;
}

async function fetch(collection, uid, query, skip, limit) {
  const userId = convertToObjectId(uid);
  const {
    filter_correspondent: filterCorrespondent,
    filter_amount_min: filterAmountMin,
    filter_amount_max: filterAmountMax,
    filter_dt: filterDate,
    sort,
  } = query;

  const filter = { userId };
  // TODO: check security risk with criteria
  if (filterCorrespondent) filter.correspondent = { $regex: filterCorrespondent, $options: 'i' };
  if (filterAmountMin || filterAmountMax) {
    filter.amount = {};
    if (filterAmountMin) filter.amount.$gte = parseFloat(filterAmountMin);
    if (filterAmountMax) filter.amount.$lte = parseFloat(filterAmountMax);
  }
  if (filterDate) filter.date = filterDate;

  let sortObject = { dt: -1 };
  if (sort) {
    const [field, direction] = sort.split('_');
    sortObject = { [field]: direction === 'desc' ? -1 : 1 };
  }

  const total = await collection.countDocuments(filter);

  const list = await collection
    .find(filter)
    .sort(sortObject)
    .skip(skip)
    .limit(limit)
    .toArray();

  return { total, list };
}

module.exports = {
  create,
  fetch,
  findById,
};
