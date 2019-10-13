import { useContext } from 'react';

import { Context } from '../appProvider';

export default function useRestClient() {
  const { restClient } = useContext(Context);
  return restClient;
}
