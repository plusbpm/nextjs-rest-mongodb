import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(3, 0, 0, 0),
    },
  },
}));

function DefaultContainer({ children, ...rest }) {
  const { main } = useStyles();
  return (
    <Container component="main" className={main} maxWidth="sm" {...rest}>
      {children}
    </Container>
  );
}

DefaultContainer.propTypes = {
  children: PropTypes.node,
};

DefaultContainer.defaultProps = {
  children: null,
};

export default DefaultContainer;
