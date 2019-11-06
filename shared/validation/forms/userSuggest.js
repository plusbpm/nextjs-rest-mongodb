const userSuggestSchema = {
  $id: 'form_usersuggest',
  type: 'object',
  properties: {
    q: { type: 'string', minLength: 2 },
  },
  required: ['q'],
};

module.exports = [userSuggestSchema];
