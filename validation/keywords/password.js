const lowercaseLetters = /[a-z]/;
const capitalLetters = /[A-Z]/;
const numbers = /[0-9]/;
// eslint-disable-next-line no-useless-escape
const otherSymbols = /[\~\@\#\$\%\^\&\*\-\|\{\}\[\]\?\;]/;

const validate = (schema, data) => {
  const messageParts = [];
  if (!capitalLetters.test(data)) messageParts.push('uppercase letters');
  if (!lowercaseLetters.test(data)) messageParts.push('lowercase letters');

  const haveNumbers = numbers.test(data);
  const haveOther = otherSymbols.test(data);
  if (!haveNumbers && !haveOther) {
    messageParts.push('at least one number or symbol');
  }
  if (messageParts.length === 0) return true;

  const error = {
    keyword: 'password',
    message: `Must contain ${messageParts.join(', ')}`,
    params: {},
  };
  validate.errors = [error];
  return false;
};

module.exports = [
  'password',
  {
    type: 'string',
    validate,
    errors: true,
    metaSchema: {
      type: 'string',
      enum: ['main'],
    },
  },
];
