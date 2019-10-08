const authRoutes = require('./authorization');

module.exports = async fastify => {
  await fastify.register(authRoutes, { prefix: '/authorization' });
};
