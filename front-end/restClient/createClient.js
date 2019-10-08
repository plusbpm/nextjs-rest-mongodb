import RestClient from './RestClient';

let restClientSingltone;

const apiRoot = process.env.API_ROOT;
const apiDomainClient = process.env.API_DOMAIN_CLIENT;
const apiDomainServer = process.env.API_DOMAIN_SERVER;

function createClient(options) {
  if (!process.browser) {
    return new RestClient({ ...options, apiRoot: `${apiDomainServer}${apiRoot}` });
  }

  if (!restClientSingltone) {
    restClientSingltone = new RestClient({ ...options, apiRoot: `${apiDomainClient}${apiRoot}` });
  }

  return restClientSingltone;
}

export default createClient;
