const { session, transaction, user } = require('../../../modules');
const transactionPostSchemas = require('../../../../shared/validation/forms/transactionPost');
const [transactionGetSchema] = require('../../../../shared/validation/forms/transactionGet');
const [
  transactionsListSchema,
] = require('../../../../shared/validation/forms/transactionsListQuery');
const [userSuggestSchema] = require('../../../../shared/validation/forms/userSuggest');
const objectIdSchema = require('../../../../shared/validation/entities/objectId');
const { CABINET__LIST_PER_PAGE } = require('../../../../shared/constants');

const throwForbidden = () => {
  const error = new Error('Fobidden');
  error.statusCode = 403;
  throw error;
};

module.exports = async fastify => {
  const { dbAdapter } = fastify;

  fastify.validation.addSchemas([...transactionPostSchemas, objectIdSchema]);

  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) throwForbidden();
    const sessionDoc = await session.find(dbAdapter, sessionId);
    if (!sessionDoc) throwForbidden();
    request.userId = sessionDoc.userId;
  });

  fastify.get('/suggest', { schema: { query: userSuggestSchema } }, async request => {
    const { q } = request.query;
    const list = await user.suggestByCriteria(dbAdapter, request.userId, q);
    return list.map(({ _id, name }) => ({ label: name, value: _id }));
  });

  fastify.post(
    '/transaction',
    { schema: { body: { $ref: 'form_transaction' } } },
    async request => {
      const { correspondentID, amount } = request.body;
      await transaction.create(dbAdapter, request.userId, correspondentID, parseFloat(amount));
      return null;
    },
  );

  fastify.get('/transaction', { schema: { query: transactionGetSchema } }, async request => {
    const transactionDoc = await transaction.findOne(
      dbAdapter,
      request.userId,
      request.query.transactionID,
    );
    return transactionDoc;
  });

  fastify.get('/transactions', { schema: { query: transactionsListSchema } }, async request => {
    const transactions = await transaction.fetch(dbAdapter, request.userId, request.query);
    const totalPages = Math.ceil(transactions.total / CABINET__LIST_PER_PAGE);
    if (totalPages > 0 && request.query.page > totalPages) {
      const pageError = new Error('Bad request');
      pageError.statusCode = 400;
      throw pageError;
    }
    return transactions;
  });
};
