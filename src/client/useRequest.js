import { useState, useEffect } from 'react';

import invariant from '../util/invariant';
import useClient from './useClient';

export const makeUseInquiry = method => (id, options = {}) => {
  invariant(typeof id === 'string', 'First argument (id) is required');
  const { client } = useClient();
  const [, setState] = useState();
  const { ignoreStateChange, noAutosend, ...sendOptions } = options;
  const inquiryInstance = client.getInquiry(id, { ...sendOptions, method });

  function handleStateChange(nextState) {
    if (!ignoreStateChange) setState(nextState);
  }
  useEffect(() => {
    inquiryInstance.onStateChange(handleStateChange);
    return () => inquiryInstance.offStateChange(handleStateChange);
  });

  useEffect(() => {
    if (!noAutosend) inquiryInstance.send(sendOptions);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return inquiryInstance;
};

export const useGetInquiry = makeUseInquiry('get');
export const usePostInquiry = makeUseInquiry('post');
export const useDeleteInquiry = makeUseInquiry('delete');
export const usePutInquiry = makeUseInquiry('put');
export const useOptionInquiry = makeUseInquiry('option');
