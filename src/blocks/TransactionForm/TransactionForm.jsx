import React from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import BackWithFallback from '../BackWithFallback';
import TextInput from '../TextInput';
import { LAYOUT_BREAKPOINT } from '../constants';

const useStyles = makeStyles(theme => ({
  actions: {
    '& > :first-child': {
      marginRight: theme.spacing(2),
    },
    padding: theme.spacing(1),
    [theme.breakpoints.up(LAYOUT_BREAKPOINT)]: {
      padding: theme.spacing(1, 0, 0, 0),
    },
  },
}));

function TransactionForm() {
  const { actions } = useStyles();
  return (
    <form>
      <TextInput name="correspondent" label="Correspondent" defaultValue="" />
      <TextField name="correspondentID" type="hidden" value="" />
      <TextInput
        name="amount"
        type="number"
        label="Amount"
        defaultValue=""
        inputProps={{ step: 0.01 }}
      />
      <Grid container justify="flex-end" className={actions}>
        <BackWithFallback fallback="/cabinet">Cancel</BackWithFallback>
        <Button type="submit" color="primary" variant="contained">
          Submit
        </Button>
      </Grid>
    </form>
  );
}

export default TransactionForm;
