import flow from 'lodash/flow';
import cleanString from './cleanString';

const lowercaseLetters = /[a-z]/;
const capitalLetters = /[A-Z]/;
const numbers = /[0-9]/;
// eslint-disable-next-line no-useless-escape
const otherSymbols = /[\~\@\#\$\%\^\&\*\-\|\{\}\[\]\?\;]/;

const validate = input => {
  const messageParts = [];
  if (!capitalLetters.test(input)) messageParts.push('uppercase letters');
  if (!lowercaseLetters.test(input)) messageParts.push('lowercase letters');

  const haveNumbers = numbers.test(input);
  const haveOther = otherSymbols.test(input);
  if (!haveNumbers && !haveOther) {
    messageParts.push('at least one number or symbol');
  }
  return messageParts.length > 0 ? `Must contain ${messageParts.join(', ')}` : true;
};

export default flow([cleanString, validate]);
