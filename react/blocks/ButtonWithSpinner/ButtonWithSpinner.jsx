import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  spinner: {
    position: 'absolute',
    opacity: 0.6,
  },
}));

function ButtonWithSpinner({ children, busy, ...rest }) {
  const { button, spinner } = useStyles();
  return (
    <Button className={button} disabled={busy} {...rest}>
      {children}
      {busy && <CircularProgress className={spinner} size={30} />}
    </Button>
  );
}

ButtonWithSpinner.propTypes = {
  busy: PropTypes.bool,
  children: PropTypes.node,
};
ButtonWithSpinner.defaultProps = {
  busy: false,
  children: null,
};

export default ButtonWithSpinner;
