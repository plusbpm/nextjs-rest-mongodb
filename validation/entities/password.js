module.exports = {
  $id: 'enitity_password',
  type: 'object',
  properties: {
    input: {
      type: 'string',
      minLength: 6,
      password: 'main',
      messages: {
        minLength: '6 characters minimum',
      },
    },
  },
};
