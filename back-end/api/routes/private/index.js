const { session, user } = require('../../../modules');
const transactionSchemas = require('../../../../shared/validation/forms/transaction');

const throwForbidden = () => {
  const error = new Error('Fobidden');
  error.statusCode = 403;
  throw error;
};

module.exports = async fastify => {
  fastify.validation.addSchemas(transactionSchemas);

  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) throwForbidden();
    const sessionDoc = await session.find(fastify.dbAdapter, sessionId);
    if (!sessionDoc) throwForbidden();
  });

  fastify.get('/suggest', async request => {
    const { q } = request.query;
    const list = await user.suggestByCriteria(fastify.dbAdapter, q);
    return list.map(({ _id, name }) => ({ label: name, value: _id }));
  });

  fastify.post('/transaction', { schema: { body: { $ref: 'form_transaction' } } }, async () => {
    // const { correspondent, correspondentID, amount } = request.body;
    return null;
  });
};
