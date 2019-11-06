const transactionGetSchema = {
  $id: 'form_transactionget',
  type: 'object',
  properties: {
    transactionID: { $ref: 'objectId' },
  },
  required: ['transactionID'],
};

module.exports = [transactionGetSchema];
