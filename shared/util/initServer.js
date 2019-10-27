const fastify = require('fastify');
const fastifyCookie = require('fastify-cookie');

module.exports = async (setup, portEnvKey) => {
  const server = fastify();

  server.register(fastifyCookie);

  await setup(server);
  const port = parseInt(process.env[portEnvKey], 10);

  await server.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Ready on http://127.0.0.1:${port}`);
};
