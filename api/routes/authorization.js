const { authorization, session } = require('../../modules');

module.exports = async fastify => {
  fastify.post('/register', async request => {
    const userId = await authorization.register(fastify.dbAdapter, request.body);
    return { userId };
  });

  fastify.post('/login', async (request, reply) => {
    const userId = await authorization.authenticate(fastify.dbAdapter, request.body);
    const cookieValue = await session.create(fastify.dbAdapter, { userId });
    reply.header('Set-Cookie', cookieValue);
    return { userId };
  });
};
