import { useContext } from 'react';

import Context from './Context';

export default function useClient() {
  return useContext(Context);
}
