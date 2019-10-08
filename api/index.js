const apiRoutes = require('./routes');
const { init } = require('../db');

const apiRoot = process.env.API_ROOT;

module.exports = async fastify => {
  const dbAdapter = await init();

  fastify.decorate('db', dbAdapter);

  await fastify.register(apiRoutes, { prefix: apiRoot });
};
