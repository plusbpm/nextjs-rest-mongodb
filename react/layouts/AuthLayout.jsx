import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';

import DefaultContainer from '../blocks/DefaultContainer';
import FormAuth from '../blocks/FormAuth';
import redirectWith from './redirectWith';

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

Auth.getInitialProps = async ctx => {
  redirectWith(ctx, '/cabinet', userId => !!userId);
};

Auth.propTypes = {
  router: PropTypes.shape().isRequired,
};

export default withRouter(Auth);
