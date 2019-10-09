const crypto = require('crypto');

module.exports = (length = 8) => {
  const saltBuf = crypto.randomBytes(length);
  const salt = saltBuf.toString('hex');
  return salt;
};
