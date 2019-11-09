require('../config/dotenv');
const fastifyProxy = require('fastify-http-proxy');
const initServer = require('../shared/util/initServer');

const mountApi = require('./api');
const { mongodb } = require('./db');
const createValidation = require('../shared/validation');
const websocket = require('./websocket');

const mockingEnabled = process.env.CREATE_MOCK_DATA === 'true';
const upstreamHost = process.env.BACKEND_UPSTREAM || '';

async function setup(server) {
  const validation = createValidation();
  const dbAdapter = await mongodb.createAdapter();
  if (mockingEnabled) await dbAdapter.mocking();

  await mountApi(server, { dbAdapter, validation, websocket });

  await websocket.init(server);

  if (upstreamHost !== '')
    server.register(fastifyProxy, {
      upstream: upstreamHost,
    });
}

initServer(setup, 'PORT_BACKEND');
