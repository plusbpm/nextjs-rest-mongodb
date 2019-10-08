import { useContext } from 'react';

import Context from './Context';

export default function useRestClient() {
  return useContext(Context);
}
