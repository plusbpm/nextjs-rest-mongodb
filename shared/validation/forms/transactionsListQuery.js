const transactionsListQuerySchema = {
  $id: 'form_transactionslist',
  type: 'object',
  properties: {
    filter_name: { type: 'string' },
    filter_amount: { type: 'string', exactDecimal: 2 },
    filter_date: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
    page: {
      type: 'number',
      minimum: 1,
    },
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

module.exports = [transactionsListQuerySchema];
