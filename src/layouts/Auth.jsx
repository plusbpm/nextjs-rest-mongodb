import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import FormAuth from '../blocks/FormAuth';

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0, 0, 0),
    },
  },
}));

function Auth({
  router: {
    query: { mode },
  },
}) {
  const { main } = useStyles();
  return (
    <Container component="main" className={main} maxWidth="sm">
      <FormAuth register={mode === 'register'} key={mode} />
    </Container>
  );
}

Auth.propTypes = {
  router: PropTypes.shape().isRequired,
};

export default withRouter(Auth);
