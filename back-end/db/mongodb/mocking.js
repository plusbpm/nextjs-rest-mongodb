const startAccount = parseInt(process.env.ACCOUNT_START_VALUE, 10);

const log = (...args) => {
  // eslint-disable-next-line no-console
  console.info(...args);
};

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

  let faker;
  try {
    // eslint-disable-next-line global-require, import/no-extraneous-dependencies
    faker = require('faker');
  } catch (e) {
    log('Faker not found, mock data will not be created.');
    return;
  }

  log(`Create mock data`);

  for (let index = 0; index < 100; index += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const name = `${lastName} ${firstName}`;
    const email = faker.internet.email(firstName, lastName);
    const password = faker.internet.password();
    const account = Math.floor(10 + Math.random() * (startAccount - 10));
    // eslint-disable-next-line no-await-in-loop
    await registerMethod(adapter, { name, email, password }, account);
  }
};
