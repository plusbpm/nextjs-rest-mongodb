const get = require('lodash/get');
const { authorization, session } = require('../../modules');
const { xssProtect } = require('../../util');

const loginSchemas = require('../../../shared/validation/forms/login');
const registerSchemas = require('../../../shared/validation/forms/register');

module.exports = async fastify => {
  fastify.validation.addSchemas([...registerSchemas, ...loginSchemas]);

  fastify.addHook('preHandler', async request => {
    const name = get(request, 'body.name');
    if (name) request.body.name = xssProtect(name);
  });

  fastify.post('/register', { schema: { body: { $ref: 'form_register' } } }, async request => {
    await authorization.register(fastify.dbAdapter, request.body);
    return null;
  });

  fastify.post('/login', { schema: { body: { $ref: 'form_login' } } }, async (request, reply) => {
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
