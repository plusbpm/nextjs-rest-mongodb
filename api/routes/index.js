const publicRoutes = require('./public');
// const privateRoutes = require('./private');

module.exports = async fastify => {
  await fastify.register(publicRoutes);

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });
};
