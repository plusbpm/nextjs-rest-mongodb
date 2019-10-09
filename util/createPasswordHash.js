const crypto = require('crypto');

module.exports = (password, salt, localParam = '') => {
  const hash = crypto
    .createHmac('sha256', `${salt}_${localParam}`)
    .update(password)
    .digest('hex');
  return hash;
};
