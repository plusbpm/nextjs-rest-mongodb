const crypto = require('crypto');

const { createRandomString } = require('../util');

const createPasswordHash = (password, salt, localParam = '') => {
  const hash = crypto
    .createHmac('sha256', `${salt}_${localParam}`)
    .update(password)
    .digest('hex');
  return hash;
};

const localParam = process.env.PASS_LOCAL_PARAM;
const startAccount = parseInt(process.env.ACCOUNT_START_VALUE, 10);

async function register(db, inputData, account = startAccount) {
  const { name, email, password } = inputData;

  const emailDoc = await db.emailFindByLabel(email);
  if (emailDoc) {
    const error = new Error('Email is already registered.');
    error.statusCode = 400;
    throw error;
  }

  const { insertedId } = await db.userInsert({ name, account });
  const userId = insertedId.toString();

  await db.emailUpsert(email, { userId });

  const salt = createRandomString();
  const hash = createPasswordHash(password, salt, localParam);
  await db.passwordInsert(userId, { salt, hash });

  return userId;
}

const throwAuthenticateError = () => {
  const error = new Error('Unknown login or password');
  error.statusCode = 400;
  throw error;
};

async function authenticate(db, inputData) {
  const { email, password } = inputData;

  const emailDoc = await db.emailFindByLabel(email);
  if (!emailDoc) throwAuthenticateError();

  const passDoc = await db.passwordFindByUserId(emailDoc.userId);
  if (!passDoc) throwAuthenticateError();

  const hash = createPasswordHash(password, passDoc.salt, localParam);
  if (hash !== passDoc.hash) throwAuthenticateError();

  const userDoc = await db.userFindById(emailDoc.userId);
  if (!userDoc) throw new Error('Inconsistent database state');

  return passDoc.userId;
}

module.exports = {
  authenticate,
  register,
};
