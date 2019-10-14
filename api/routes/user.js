const { session, user } = require('../../modules');

module.exports = async fastify => {
  fastify.get('/user', async request => {
    const sid = request && request.cookies.sid;
    if (!sid) return null;
    const userId = await session.find(fastify.dbAdapter, sid);
    const userDoc = await user.find(fastify.dbAdapter, userId);
    return userDoc || {};
  });
};
