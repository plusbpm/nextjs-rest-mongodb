import React, { useRef, useState } from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import BackWithFallback from '../BackWithFallback';
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextInput from '../TextInput';
import TextInputSuggest from '../TextInputSuggest';
import { LAYOUT_BREAKPOINT } from '../constants';
import { useInquery } from '../../restClient';
import useFormValidation from '../useFormValidation';

import createValidation from '../../../shared/validation';
import schemas from '../../../shared/validation/forms/transaction';

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

const validate = createValidation({ schemas }).getSchema('form_transaction');

const makeSubmitHandler = transactionInquery => data => {
  transactionInquery.send({
    endpoint: `/private/transaction`,
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

function TransactionForm() {
  const { actions } = useStyles();
  const corrRef = useRef(null);
  // const corrIDRef = useRef(null);
  const [corrID, setCorrID] = useState('');

  const transactionInquery = useInquery('transaction');
  const [formProps, errors] = useFormValidation({
    validate,
    submit: makeSubmitHandler(transactionInquery),
  });

  const { correspondent, correspondentID, amount } = errors;
  const corrError = correspondent || correspondentID;

  return (
    <form {...formProps}>
      <TextInputSuggest
        name="correspondent"
        label="Correspondent"
        endpoint="/private/suggest"
        inputRef={corrRef}
        onSelect={({ label, value }) => {
          corrRef.current.value = label;
          setCorrID(value);
        }}
        onReset={() => {
          setCorrID('');
        }}
        error={!!corrError}
        helperText={corrError && corrError.message}
      />
      <TextField name="correspondentID" type="hidden" value={corrID} />
      <TextInput
        name="amount"
        type="number"
        label="Amount"
        defaultValue=""
        inputProps={{ step: 0.01 }}
        error={!!amount}
        helperText={amount && amount.message}
      />
      <Grid container justify="flex-end" className={actions}>
        <BackWithFallback fallback="/cabinet">Cancel</BackWithFallback>
        <ButtonWithSpinner type="submit" color="primary" variant="contained">
          Submit
        </ButtonWithSpinner>
      </Grid>
    </form>
  );
}

export default TransactionForm;
