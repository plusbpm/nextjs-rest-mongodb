module.exports = (fastify, { mongodb }, done) => {
  fastify.get('/test', async () => {
    await mongodb.createCollection('test2');
    return { uha: Math.random() };
  });

  fastify.all('/*', async (request, reply) => {
    reply.code(404);
    return 'Неизвестный адрес в апи.';
  });

  done();
};
