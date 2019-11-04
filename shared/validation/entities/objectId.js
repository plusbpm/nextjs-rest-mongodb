module.exports = {
  $id: 'objectId',
  type: 'string',
  pattern: '^[A-Fa-f0-9]{24}$',
  messages: {
    pattern: '24 characters from the ranges a-f 0-9',
  },
};
