const dotenv = require('dotenv-safe');

const { error } = dotenv.config({ allowEmptyValues: true });
if (error) throw error;

const fastify = require('fastify');
const next = require('next');

const mountApi = require('./api');

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nextApp = next({ dev });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  const server = fastify();
  await mountApi(server);

  server.get('*', async ({ raw }, { res }) => nextHandle(raw, res));
  await server.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Ready on http://127.0.0.1:${port}`);
}

start();
