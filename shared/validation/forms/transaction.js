const userSchema = require('../entities/user');

const transactionSchema = {
  $id: 'form_transaction',
  type: 'object',
  properties: {
    correspondent: {
      $ref: 'enitity_user#/properties/name',
      messages: {
        required: 'Required field',
      },
    },
    correspondentID: {
      type: 'string',
      messages: {
        required: 'Select correspondent from list',
      },
    },
    amount: {
      type: 'string',
      exactDecimal: 2,
      messages: {
        required: 'Required field',
      },
    },
  },
  required: ['correspondent', 'correspondentID', 'amount'],
};

module.exports = [userSchema, transactionSchema];
