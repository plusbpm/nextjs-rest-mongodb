const { convertToObjectId } = require('../util');

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

    const { result: senderResult } = await transactionCollection.insertOne(
      {
        amount,
        account: senderDoc.account - amount,
        userId: senderObjectID,
        incoming: false,
        correspondent: recipientDoc.name,
        correspondentID: recipientObjectID,
        dt,
      },
      { session },
    );
    if (senderResult.ok !== 1) throw new Error('Sender transaction create error');

    const { result: recipientResult } = await transactionCollection.insertOne(
      {
        amount,
        account: recipientDoc.account + amount,
        userId: recipientObjectID,
        incoming: true,
        correspondent: senderDoc.name,
        correspondentID: senderObjectID,
        dt,
      },
      { session },
    );
    if (recipientResult.ok !== 1) throw new Error('Recipient transaction create error');

    const { modifiedCount: senderModifiedCount } = await userCollection.updateOne(
      { _id: senderObjectID, account: senderDoc.account },
      { $inc: { account: -amount } },
      { session },
    );
    if (senderModifiedCount !== 1) throw new Error('Sender data competitive write error');

    const { modifiedCount: recipientModifiedCount } = await userCollection.updateOne(
      { _id: recipientObjectID, account: recipientDoc.account },
      { $inc: { account: amount } },
      { session },
    );
    if (recipientModifiedCount !== 1) throw new Error('Recipient competitive write error');
  } catch (error) {
    await session.abortTransaction();
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

module.exports = {
  create,
  findById,
};
