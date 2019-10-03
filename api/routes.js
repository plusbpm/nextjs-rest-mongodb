const get = require('lodash/get');

module.exports = (fastify, { mongodb }, done) => {
  fastify.get('/test', async () => {
    await mongodb.createCollection('test2');
    return { uha: Math.random() };
  });

  fastify.get('/autocomplete', async request => {
    const list = [
      { id: '1', name: 'asdfgh' },
      { id: '2', name: 'asdzxc' },
      { id: '3', name: 'asdqwe' },
      { id: '4', name: 'qwerty' },
      { id: '5', name: 'qweasd' },
      { id: '6', name: 'qwezxc' },
      { id: '7', name: 'fghqwe' },
      { id: '8', name: 'fghvbn' },
      { id: '9', name: 'fghzxc' },
      { id: '10', name: 'rtyfgh' },
    ];
    const q = get(request, 'query.q');
    const regex = new RegExp(q, 'gi');

    return list.filter(({ name }) => regex.test(name));
  });

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Unknown api endpoint.';
  });

  done();
};
