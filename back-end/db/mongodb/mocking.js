const startAccount = parseInt(process.env.ACCOUNT_START_VALUE, 10);

const log = (...args) => {
  // eslint-disable-next-line no-console
  console.info(...args);
};

const usersCountToMock = 100;
const credentials = {};

module.exports = async adapter => {
  const { db } = adapter;

  const usersCollection = db.collection('user');
  const usersCount = await usersCollection.countDocuments();
  if (usersCount > 0) {
    log(`Users count in database ${usersCount}, skip mocking`);
    return;
  }

  let registerMethod;
  try {
    // eslint-disable-next-line global-require
    const authorization = require('../../modules/authorization');
    registerMethod = authorization.register;
  } catch (e) {
    log('Authorization initialization error, mock data will not be created.');
    return;
  }

  let createTransactionMethod;
  try {
    // eslint-disable-next-line global-require
    const transaction = require('../../modules/transaction');
    createTransactionMethod = transaction.create;
  } catch (e) {
    log('Transaction initialization error, mock data will not be created.');
    return;
  }

  let faker;
  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    faker = require('faker');
  } catch (e) {
    log('Faker not found, mock data will not be created.');
    return;
  }

  log(`Create mock data`);

  for (let index = 0; index < usersCountToMock; index += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${lastName} ${firstName}`;
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password();
    credentials[email.toLocaleLowerCase()] = password;
    const account = Math.floor(10 + Math.random() * (startAccount - 10));
    // eslint-disable-next-line no-await-in-loop
    await registerMethod(adapter, { name, email, password }, account);
  }

  let count = 0;
  while (count < usersCountToMock * 10) {
    // eslint-disable-next-line no-await-in-loop
    const [senderUser] = await usersCollection
      .find()
      .skip(Math.floor(Math.random() * usersCountToMock))
      .limit(1)
      .toArray();
    // eslint-disable-next-line no-await-in-loop
    const [recipientUser] = await usersCollection
      .find()
      .skip(Math.floor(Math.random() * usersCountToMock))
      .limit(1)
      .toArray();

    const amount = Math.floor(1 + Math.random() * 5);

    if (
      !senderUser ||
      !recipientUser ||
      senderUser.account < amount ||
      senderUser._id.toString() === recipientUser._id.toString() // eslint-disable-line no-underscore-dangle
    )
      continue; // eslint-disable-line no-continue

    // eslint-disable-next-line no-await-in-loop, no-underscore-dangle
    await createTransactionMethod(adapter, senderUser._id, recipientUser._id, amount);
    count += 1;
  }

  const [{ _id: userId }] = await db
    .collection('transaction')
    .aggregate([
      {
        $group: {
          _id: '$userId',
          count: {
            $sum: 1.0,
          },
        },
      },
      {
        $sort: {
          count: -1.0,
        },
      },
      {
        $limit: 1.0,
      },
    ])
    .toArray();

  const mail = await db.collection('email').findOne({ userId: userId.toString() });
  const pass = credentials[mail.label];

  if (mail && pass) log('Most filled user: ', mail.label, pass);
};
