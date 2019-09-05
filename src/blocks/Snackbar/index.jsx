import React, { Component } from 'react';
import PropTypes from 'prop-types';

import SnackbarMui from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Snackbar extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  get message() {
    const { messages } = this.props;
    return messages.map(message => (
      <span key={message}>
        {message}
        <br />
      </span>
    ));
  }

  get open() {
    return this.props.messages.length > 0;
  }

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      // if (!this.errors.length) return;
    }
  };

  render() {
    const { classes, onClose, variant, ...rest } = this.props;
    return (
      <SnackbarMui open={this.open} {...rest}>
        <SnackbarContent
          className={classes[variant]}
          message={this.message}
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose}>
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </SnackbarMui>
    );
  }
}

Snackbar.propTypes = {
  classes: PropTypes.shape().isRequired,
  messages: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['info', 'success', 'warning']),
};
Snackbar.defaultProps = {
  messages: [],
  onClose: undefined,
  variant: 'info',
};

export default withStyles(styles)(Snackbar);
