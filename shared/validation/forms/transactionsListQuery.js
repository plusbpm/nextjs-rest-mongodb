const transactionsListQuerySchema = {
  $id: 'form_transactionslist',
  type: 'object',
  properties: {
    filter_correspondent: {
      type: 'string',
      minLength: 2,
      messages: {
        minLength: 'Minimum 2 symbols',
      },
    },
    filter_amount_min: { type: 'string', exactDecimal: 2 },
    filter_amount_max: { type: 'string', exactDecimal: 2 },
    filter_dt: { type: 'string', pattern: '^[0-9]{4}-[0-9]{2}-[0-9]{2}$' },
    page: {
      type: 'number',
      minimum: 1,
      multipleOf: 1,
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
