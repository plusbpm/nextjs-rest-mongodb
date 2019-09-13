import toLower from 'lodash/toLower';
import flow from 'lodash/flow';
import cleanString from './cleanString';

const emailRegex = /^([a-z0-9_\-\.])+@([a-z0-9_\-\.])+\.([a-z]{2,4})$/i;
const validate = input => emailRegex.test(input) || 'Not valid address';

export default flow([cleanString, toLower, validate]);
