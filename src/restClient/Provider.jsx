import React from 'react';
import PropTypes from 'prop-types';

import RestClient from './RestClient';
import Context from './Context';

const Provider = ({ children, restClient }) => (
  <Context.Provider value={{ restClient }}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node,
  restClient: PropTypes.instanceOf(RestClient).isRequired,
};

Provider.defaultProps = {
  children: null,
};

export default Provider;
