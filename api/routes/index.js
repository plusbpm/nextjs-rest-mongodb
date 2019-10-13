const authRoutes = require('./authorization');
const privateRoutes = require('./private');

module.exports = async fastify => {
  await fastify.register(authRoutes);

  await fastify.register(privateRoutes, { prefix: '/private' });

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });
};
