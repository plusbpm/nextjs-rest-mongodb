const { authorization, session } = require('../../modules');

module.exports = async fastify => {
  fastify.post('/register', async request => {
    await authorization.register(fastify.dbAdapter, request.body);
    return null;
  });

  fastify.post('/login', async (request, reply) => {
    const userId = await authorization.authenticate(fastify.dbAdapter, request.body);
    const setCookieArgs = await session.create(fastify.dbAdapter, { userId });
    reply.setCookie(...setCookieArgs);
    return null;
  });

  fastify.get('/logout', async (request, reply) => {
    const sessionId = request.cookies[session.cookieName];
    const clearCookieArgs = await session.destroy(fastify.dbAdapter, sessionId);
    reply.clearCookie(...clearCookieArgs);
    return null;
  });
};
