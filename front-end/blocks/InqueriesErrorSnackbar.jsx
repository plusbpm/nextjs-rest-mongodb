import React from 'react';
import values from 'lodash/values';

import Snackbar from './Snackbar';
import { useRestClient, useInqueriesMap } from '../restClient';

const getErrorFunc = inquery => inquery.getState().error;

const InqueriesErrorSnackbar = props => {
  const restClient = useRestClient();
  const errorsMap = useInqueriesMap({ mapFunc: getErrorFunc });

  const messages = values(errorsMap)
    .filter(error => !!error)
    .map(({ code = '', details, message }) => `${code} ${details || message}`);

  return (
    <Snackbar {...props} messages={messages} variant="warning" onClose={restClient.cleanErrors} />
  );
};

export default InqueriesErrorSnackbar;
