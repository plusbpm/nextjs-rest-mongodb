require('../config/dotenv');
const next = require('next');

const initServer = require('../shared/util/initServer');

const dev = process.env.NODE_ENV !== 'production';

async function setup(server) {
  const nextApp = next({ dev, dir: './react' });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();
  server.get('*', async ({ raw }, { res }) => nextHandle(raw, res));
}

initServer(setup, 'PORT_REACT');
