import React, { PureComponent } from 'react';
import Router from 'next/router';
import delay from 'lodash/delay';
import isEqual from 'lodash/isEqual';

import Subheader, { allFields } from './Subheader';
import omitEmpty from '../../../util/omitEmpty';

const updateQueryWithRouter = queryPatch => {
  const {
    pathname,
    query: { page, ...query },
  } = Router;
  const nextQuery = omitEmpty({ ...query, ...queryPatch });
  if (!isEqual(query, nextQuery)) Router.replace({ pathname, query: nextQuery });
};

export default class SubheaderIndex extends PureComponent {
  handleChange = (...args) => {
    clearTimeout(this.timer);
    this.timer = delay(this.delayedChangeHandler, 300, ...args);
  };

  delayedChangeHandler = form => {
    const patch = allFields.reduce((acc, field) => ({ ...acc, [field]: form[field] }), {});
    updateQueryWithRouter(patch);
  };

  render = () => <Subheader {...this.props} onChange={this.handleChange} />;
}
