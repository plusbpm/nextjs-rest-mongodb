import RestClient from './Client';

let client;

function createClient(options) {
  if (!process.browser) {
    return new RestClient(options);
  }

  if (!client) {
    client = new RestClient(options);
  }

  return client;
}

export default createClient;
