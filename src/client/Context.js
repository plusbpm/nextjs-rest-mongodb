import { createContext } from 'react';

import RestClient from './Client';

const defaultClient = new RestClient();

export default createContext({ client: defaultClient });
