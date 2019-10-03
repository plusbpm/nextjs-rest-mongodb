import React from 'react';
import useInquery from './useInquery';

const withInquery = (id, options) => Component => {
  const getOptions = props => (typeof options === 'function' ? options(props) : options);

  const WithInquery = props => {
    const inquery = useInquery(id, getOptions(props));
    const nextProps = { ...props, [`${id}Inquery`]: inquery };
    return <Component {...nextProps} />;
  };

  WithInquery.displayName = `WithInquery(${id})(${Component.name})`;

  return WithInquery;
};

export default withInquery;
