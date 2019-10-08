import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import SnackbarMui from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './Snackbar.styles';

const Snackbar = ({ className, global, messages, onClose, variant }) => {
  const { open, initial, ...classes } = useStyles();
  const isOpen = messages.filter(text => !!text).length > 0;

  const content = (
    <SnackbarContent
      className={clsx(initial, classes[variant], isOpen && open, className)}
      message={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <div>
          {messages.map(text => (
            <span key={text}>
              {text}
              <br />
            </span>
          ))}
        </div>
      }
      action={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      }
    />
  );

  const handleKeyDown = event => {
    if (!isOpen) return;
    if (event.keyCode === 27 && onClose) {
      onClose();
    }
  };

  useEffect(() => {
    if (!global) return () => {};
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return global ? <SnackbarMui open={isOpen}>{content}</SnackbarMui> : content;
};

Snackbar.propTypes = {
  className: PropTypes.string,
  global: PropTypes.bool,
  messages: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info', 'success', 'warning']),
};

Snackbar.defaultProps = {
  className: '',
  global: true,
  messages: [],
  onClose: undefined,
  variant: 'info',
};

export default Snackbar;
