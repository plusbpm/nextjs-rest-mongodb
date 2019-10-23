const createAjv = require('./createAjv');
const makeAddSchemas = require('./makeAddSchemas');

module.exports = options => {
  const ajv = createAjv(options);
  const addSchemas = makeAddSchemas(ajv);
  const getSchema = ref => ajv.getSchema(ref);
  return { ajv, addSchemas, getSchema };
};
