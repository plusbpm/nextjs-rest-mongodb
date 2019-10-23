module.exports = {
  $id: 'enitity_user',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      messages: {
        minLength: '3 characters minimum',
        maxLength: '50 characters maximum',
      },
    },
    account: {
      type: 'number',
    },
  },
};
