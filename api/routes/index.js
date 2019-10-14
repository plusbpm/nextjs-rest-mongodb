const authRoutes = require('./authorization');
const userRoutes = require('./user');
const privateRoutes = require('./private');

module.exports = async fastify => {
  await fastify.register(authRoutes);

  await fastify.register(userRoutes);

  await fastify.register(privateRoutes, { prefix: '/private' });

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });
};
