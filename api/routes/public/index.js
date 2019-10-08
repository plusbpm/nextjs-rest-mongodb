const user = require('./user');

module.exports = async fastify => {
  await fastify.register(user, { prefix: '/user' });
};
