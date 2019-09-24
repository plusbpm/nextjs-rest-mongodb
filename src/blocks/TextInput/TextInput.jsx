import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';

import useStyles from './TextInput.styles';

const TextInput = ({ inputProps, InputLabelProps, FormHelperTextProps, ...props }) => {
  const { field, fieldInput, fieldLabel, fieldHelper } = useStyles();
  return (
    <TextField
      className={field}
      fullWidth
      margin="dense"
      inputProps={{ className: fieldInput, ...inputProps }}
      InputLabelProps={{ className: fieldLabel, ...InputLabelProps }}
      FormHelperTextProps={{ className: fieldHelper, ...FormHelperTextProps }}
      {...props}
    />
  );
};

TextInput.propTypes = {
  inputProps: PropTypes.shape(),
  InputLabelProps: PropTypes.shape(),
  FormHelperTextProps: PropTypes.shape(),
};

TextInput.defaultProps = {
  inputProps: {},
  InputLabelProps: {},
  FormHelperTextProps: {},
};

export default TextInput;
