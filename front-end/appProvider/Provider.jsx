import React from 'react';
import PropTypes from 'prop-types';

import RestClient from '../restClient/RestClient';
import Context from './Context';

const Provider = ({ children, nextRoutingOccur, restClient }) => (
  <Context.Provider value={{ nextRoutingOccur, restClient }}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node,
  nextRoutingOccur: PropTypes.bool,
  restClient: PropTypes.instanceOf(RestClient).isRequired,
};

Provider.defaultProps = {
  children: null,
  nextRoutingOccur: false,
};

export default Provider;
