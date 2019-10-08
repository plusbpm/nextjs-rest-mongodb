const { authorization, session } = require('../../../modules');

module.exports = async fastify => {
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body;
    const userId = await authorization.authenticate(fastify.db, email, password);
    console.log(userId);
    // const sessionId = await session.login(userId);
    const sessionId = 'SesSSionID';
    reply.header(
      'Set-Cookie',
      `sid=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=${session.config.cookieMaxAge}; Path=/`,
    );
    return { login: true };
  });

  fastify.post('/login', async (request, reply) => {
    const { name, email, password, repeat } = request.body;
    const userId = await authorization.authenticate(fastify.db, login, password);
    console.log(userId);
    // const sessionId = await session.login(userId);
    const sessionId = 'SesSSionID';
    reply.header(
      'Set-Cookie',
      `sid=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=${session.config.cookieMaxAge}; Path=/`,
    );
    return { login: true };
  });
};
