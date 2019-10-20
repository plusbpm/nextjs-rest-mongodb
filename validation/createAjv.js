const Ajv = require('ajv');

const makeAddSchemas = require('./makeAddSchemas');
const keywords = require('./keywords');

const defaultOptions = {
  $data: true,
  allErrors: true,
  coerceTypes: true,
  removeAdditional: true,
  format: 'full',
  extendRefs: true,
  verbose: true,
};

module.exports = ({ schemas = [], ...options } = {}) => {
  const ajv = new Ajv({ ...defaultOptions, ...options });
  keywords.forEach(args => ajv.addKeyword(...args));
  return makeAddSchemas(ajv)(schemas);
};
