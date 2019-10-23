module.exports = ajv => schemas => {
  schemas.forEach(schema => {
    const existsSchema = ajv.getSchema(schema.$id);
    if (!existsSchema) ajv.addSchema(schema);
  });
  return ajv;
};
