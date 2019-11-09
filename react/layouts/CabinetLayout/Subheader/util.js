import Router from 'next/router';
import partialRight from 'lodash/partialRight';

import omitEmpty from '../../../util/omitEmpty';

const updateQueryWithRouter = (queryPatch, method) => {
  const { pathname, query } = Router;
  Router[method]({ pathname, query: omitEmpty({ ...query, ...queryPatch }) });
};

export const pushQueryPatch = partialRight(updateQueryWithRouter, 'push');

export const replaceQueryPatch = partialRight(updateQueryWithRouter, 'replace');
