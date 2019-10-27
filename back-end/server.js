require('../config/dotenv');
const initServer = require('../shared/util/initServer');

const mountApi = require('./api');
const { mongodb } = require('./db');
const createValidation = require('../shared/validation');

const mockingEnabled = process.env.CREATE_MOCK_DATA === 'true';

async function setup(server) {
  const validation = createValidation();
  const dbAdapter = await mongodb.createAdapter();

  if (mockingEnabled) await dbAdapter.mocking();

  await mountApi(server, { dbAdapter, validation });
}

initServer(setup, 'PORT_BACKEND');
