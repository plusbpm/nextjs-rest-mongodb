const path = require('path');
const dotenv = require('dotenv-safe');
const fastifyStatic = require('fastify-static');

const { error } = dotenv.config({ allowEmptyValues: true });
if (error) throw error;

const fastify = require('fastify');
const next = require('next');

const mountApi = require('./api');
const { mongodb } = require('./db');

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== 'production';

async function start() {
  const nextApp = next({ dev, dir: './front-end' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();

  const dbAdapter = await mongodb.createAdapter();

  const server = fastify();
  await mountApi(server, { dbAdapter });

  await server.register(fastifyStatic, {
    root: path.join(__dirname, 'static'),
    prefix: '/static/',
  });

  server.get('*', async ({ raw }, { res }) => nextHandle(raw, res));
  await server.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`Ready on http://127.0.0.1:${port}`);
}

start();
