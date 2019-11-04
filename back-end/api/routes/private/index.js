const { session, transaction, user } = require('../../../modules');
const transactionSchemas = require('../../../../shared/validation/forms/transaction');
const objectIdSchema = require('../../../../shared/validation/entities/objectId');

const throwForbidden = () => {
  const error = new Error('Fobidden');
  error.statusCode = 403;
  throw error;
};

module.exports = async fastify => {
  const { dbAdapter } = fastify;

  fastify.validation.addSchemas([...transactionSchemas, objectIdSchema]);

  fastify.addHook('preHandler', async request => {
    const sessionId = request.cookies[session.cookieName];
    if (!sessionId) throwForbidden();
    const sessionDoc = await session.find(dbAdapter, sessionId);
    if (!sessionDoc) throwForbidden();
    request.userId = sessionDoc.userId;
  });

  const suggestQuerySchema = {
    type: 'object',
    properties: {
      q: { type: 'string', minLength: 2 },
    },
    required: ['q'],
  };
  fastify.get('/suggest', { schema: { query: suggestQuerySchema } }, async request => {
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

  const transactionQuerySchema = {
    type: 'object',
    properties: {
      transactionID: { $ref: 'objectId' },
    },
    required: ['transactionID'],
  };
  fastify.get('/transaction', { schema: { query: transactionQuerySchema } }, async request => {
    const transactionDoc = await transaction.findOne(
      dbAdapter,
      request.userId,
      request.query.transactionID,
    );
    return transactionDoc;
  });

  const transactionsQuerySchema = {
    type: 'object',
    properties: {
      filter_name: { type: 'string' },
      filter_amount: { type: 'string', exactDecimal: 2 },
      filter_date: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
      sort: {
        type: 'string',
        enum: [
          'correspondent_asc',
          'correspondent_desc',
          'amount_asc',
          'amount_desc',
          'dt_asc',
          'dt_desc',
        ],
      },
    },
  };
  fastify.get('/transactions', { schema: { query: transactionsQuerySchema } }, async request => {
    const transactions = await transaction.fetch(dbAdapter, request.userId, request.query);
    return transactions;
  });
};
