const { session } = require('../../modules');

const authRoutes = require('./authorization');
const userRoutes = require('./user');
const privateRoutes = require('./private');

module.exports = async fastify => {
  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) return;
    await session.touch(fastify.dbAdapter, sessionId);
  });

  await fastify.register(authRoutes);

  await fastify.register(userRoutes);

  await fastify.register(privateRoutes, { prefix: '/private' });

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });
};
