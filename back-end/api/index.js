const apiRoutes = require('./routes');

const apiRoot = process.env.API_ROOT;

module.exports = async (fastify, { dbAdapter, validation } = {}) => {
  if (!dbAdapter) throw new Error('dbAdapter option is required for api routes');

  fastify.decorate('dbAdapter', dbAdapter);

  fastify.decorate('validation', validation);
  fastify.setSchemaCompiler(schema => validation.ajv.compile(schema));

  fastify.setErrorHandler(async (error, request, reply) => {
    const statusCode = error.validation ? 400 : error.statusCode;
    reply.code(statusCode || 500);
    return error.message;
  });

  await fastify.register(apiRoutes, { prefix: apiRoot });
};
