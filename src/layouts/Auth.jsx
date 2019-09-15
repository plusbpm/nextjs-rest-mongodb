import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';

import DefaultContainer from '../blocks/DefaultContainer';
import FormAuth from '../blocks/FormAuth';

function Auth({
  router: {
    query: { mode },
  },
}) {
  return (
    <DefaultContainer>
      <FormAuth register={mode === 'register'} key={mode} />
    </DefaultContainer>
  );
}

Auth.propTypes = {
  router: PropTypes.shape().isRequired,
};

export default withRouter(Auth);
