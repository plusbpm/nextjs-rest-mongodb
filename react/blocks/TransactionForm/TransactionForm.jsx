import React, { useState } from 'react';

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
import Snackbar from '../Snackbar';

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
  successSnackbar: {
    margin: theme.spacing(1, 0, 1, 0),
  },
}));

const validate = createValidation({ schemas }).getSchema('form_transaction');

const makeSubmitHandler = (transactionInquery, handleSuccess) => data => {
  transactionInquery
    .send({
      endpoint: `/private/transaction`,
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      const { error } = transactionInquery.getState();
      if (!error) handleSuccess();
    });
};

function TransactionForm() {
  const { actions, successSnackbar } = useStyles();
  const [corrID, setCorrID] = useState('');
  const [transferNumber, setTransferNumber] = useState(0);
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => setSuccess(true);
  const handleSuccessClose = () => {
    setSuccess(false);
    setCorrID('');
    setTransferNumber(transferNumber + 1);
  };

  const transactionInquery = useInquery('transaction');
  const [formProps, errors] = useFormValidation({
    validate,
    submit: makeSubmitHandler(transactionInquery, handleSuccess),
  });

  const { correspondent, correspondentID, amount } = errors;
  const corrError = correspondent || correspondentID;

  return (
    <form {...formProps} key={transferNumber}>
      <TextInputSuggest
        name="correspondent"
        label="Correspondent"
        endpoint="/private/suggest"
        onSelect={({ value }) => {
          setCorrID(value);
        }}
        onReset={() => {
          setCorrID('');
        }}
        error={!!corrError}
        helperText={corrError && corrError.message}
        disabled={success}
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
        disabled={success}
      />
      {success && (
        <Snackbar
          className={successSnackbar}
          messages={['Transaction successful']}
          variant="success"
          global={false}
          onClose={handleSuccessClose}
        />
      )}
      <Grid container justify="flex-end" className={actions}>
        <BackWithFallback fallback="/cabinet">Cancel</BackWithFallback>
        <ButtonWithSpinner type="submit" color="primary" variant="contained" disabled={success}>
          Submit
        </ButtonWithSpinner>
      </Grid>
    </form>
  );
}

export default TransactionForm;
