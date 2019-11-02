const { session, transaction, user } = require('../../../modules');
const transactionSchemas = require('../../../../shared/validation/forms/transaction');

const throwForbidden = () => {
  const error = new Error('Fobidden');
  error.statusCode = 403;
  throw error;
};

module.exports = async fastify => {
  const { dbAdapter } = fastify;

  fastify.validation.addSchemas(transactionSchemas);

  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) throwForbidden();
    const sessionDoc = await session.find(dbAdapter, sessionId);
    if (!sessionDoc) throwForbidden();
    request.userId = sessionDoc.userId;
  });

  fastify.get('/suggest', async request => {
    const { q } = request.query;
    const list = await user.suggestByCriteria(dbAdapter, q);
    return list.map(({ _id, name }) => ({ label: name, value: _id }));
  });

  fastify.post(
    '/transaction',
    { schema: { body: { $ref: 'form_transaction' } } },
    async request => {
      const { body, userId } = request;
      const { correspondentID, amount } = body;
      await transaction.create(dbAdapter, userId, correspondentID, parseFloat(amount));
      return null;
    },
  );
};
