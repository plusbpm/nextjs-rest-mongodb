import RestClient from './RestClient';

let restClientSingltone;

const apiRootClient = process.env.API_ROOT_CLIENT;
const apiRootServer = process.env.API_ROOT_SERVER;

function createClient(options) {
  if (!process.browser) {
    return new RestClient({ ...options, apiRoot: apiRootServer });
  }

  if (!restClientSingltone) {
    restClientSingltone = new RestClient({ ...options, apiRoot: apiRootClient });
  }

  return restClientSingltone;
}

export default createClient;
