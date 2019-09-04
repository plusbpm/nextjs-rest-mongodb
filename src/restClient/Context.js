import { createContext } from 'react';

import RestClient from './RestClient';

const defaultClient = new RestClient();

export default createContext({ restClient: defaultClient });
