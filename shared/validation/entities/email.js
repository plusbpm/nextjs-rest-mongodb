module.exports = {
  $id: 'enitity_email',
  type: 'object',
  properties: {
    label: {
      type: 'string',
      format: 'email',
      messages: {
        format: 'Incorrect email format',
      },
    },
  },
};
