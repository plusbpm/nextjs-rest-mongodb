const apiRoutes = require('./routes');

const apiRoot = process.env.API_ROOT;

module.exports = async (fastify, { dbAdapter } = {}) => {
  if (!dbAdapter) throw new Error('dbAdapter option is required for api routes');

  fastify.decorate('dbAdapter', dbAdapter);

  await fastify.register(apiRoutes, { prefix: apiRoot });
};
