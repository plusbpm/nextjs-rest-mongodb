import { createContext } from 'react';

import RestClient from '../restClient/RestClient';

const defaultClient = new RestClient();

export default createContext({
  restClient: defaultClient,
  nextRoutingOccur: false,
});
