import { useState, useEffect } from 'react';
import values from 'lodash/values';
import pick from 'lodash/pick';

import useRestClient from './useRestClient';

const useInqueriesMap = options => {
  const restClient = useRestClient();
  const [udpatesCount, setUpdatesCount] = useState(0);

  function handleStateChange() {
    setUpdatesCount(udpatesCount + 1);
  }

  const inqueriesMap = restClient.getInqueriesMap(pick(options, ['ids']));

  useEffect(() => {
    const inqueries = values(inqueriesMap);
    inqueries.forEach(inquery => inquery.onStateChange(handleStateChange));
    return () => inqueries.forEach(inquery => inquery.offStateChange(handleStateChange));
  });

  return restClient.getInqueriesMap(options);
};

export default useInqueriesMap;
