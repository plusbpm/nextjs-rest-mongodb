const { authorization, session } = require('../../modules');

module.exports = async fastify => {
  // fastify.post('/register', async (request, reply) => {
  //   const { name, email, password, repeat } = request.body;
  //   const sessionId = 'SesSSionID';
  //   reply.header(
  //     'Set-Cookie',
  //     `sid=${sessionId}; HttpOnly; SameSite=Lax; Max-Age=${session.config.cookieMaxAge}; Path=/`,
  //   );
  //   return { login: true };
  // });
  // fastify.post('/login', async (request, reply) => {
  //   throw new Error('Not implemented');
  // });
};
