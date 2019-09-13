import React from 'react';

import TextField from '@material-ui/core/TextField';

import useStyles from './TextInput.styles';

export default function TextInput(props) {
  const { field, fieldInput, fieldLabel, fieldHelper } = useStyles();
  return (
    <TextField
      className={field}
      fullWidth
      margin="dense"
      inputProps={{ className: fieldInput }}
      InputLabelProps={{ className: fieldLabel }}
      FormHelperTextProps={{ className: fieldHelper }}
      {...props}
    />
  );
}
