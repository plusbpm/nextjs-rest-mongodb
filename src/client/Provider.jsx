import React from "react";
import PropTypes from "prop-types";

import RestClient from "./Client";
import Context from "./Context";

const Provider = ({ children, client }) => (
  <Context.Provider value={{ client }}>{children}</Context.Provider>
);

Provider.propTypes = {
  children: PropTypes.node,
  client: PropTypes.instanceOf(RestClient).isRequired
};

Provider.defaultProps = {
  children: null
};

export default Provider;
