import { useState, useEffect } from 'react';

import invariant from '../../shared/util/invariant';
import useRestClient from './useRestClient';

const useInquery = (id, options = {}) => {
  invariant(typeof id === 'string', 'First argument (id) is required');
  const restClient = useRestClient();
  const [, setState] = useState();
  const { ignoreStateChange, autosend, ...sendOptions } = options;
  const inquiryInstance = restClient.getInquery(id, sendOptions);

  function handleStateChange(nextState) {
    if (!ignoreStateChange) setState(nextState);
  }
  useEffect(() => {
    inquiryInstance.onStateChange(handleStateChange);
    return () => inquiryInstance.offStateChange(handleStateChange);
  });

  useEffect(() => {
    if (autosend) inquiryInstance.send(sendOptions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return inquiryInstance;
};

export default useInquery;
