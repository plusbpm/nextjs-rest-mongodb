const crypto = require('crypto');
const config = require('../config/authorization');

const wrongCredentialsMessage = 'Unknown login or password';

async function authenticate(db, email, password) {
  const user = await db.findUserByEmail(email);
  if (!user) throw new Error(wrongCredentialsMessage);
  const hash = crypto
    .createHmac('sha256', `${user.email}_${config.salt}`)
    .update(password)
    .digest('hex');
  const passwordDoc = await db.findPassword(hash);
  if (!passwordDoc) throw new Error(wrongCredentialsMessage);
  return user.id;
}

module.exports = {
  authenticate,
  config,
};
