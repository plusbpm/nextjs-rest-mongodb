const apiRoutes = require('./routes');

const apiRoot = process.env.API_ROOT;

module.exports = async (fastify, { dbAdapter } = {}) => {
  if (!dbAdapter) throw new Error('dbAdapter option is required for api routes');

  fastify.decorate('dbAdapter', dbAdapter);

  fastify.setErrorHandler(async (error, request, reply) => {
    reply.code(error.statusCode || 500);
    return error.message;
  });

  await fastify.register(apiRoutes, { prefix: apiRoot });
};
