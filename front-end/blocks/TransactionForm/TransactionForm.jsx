import React from 'react';

import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import useForm from 'react-hook-form';

import BackWithFallback from '../BackWithFallback';
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextInput from '../TextInput';
import TextInputAutocomplete from '../TextInputAutocomplete';
import { LAYOUT_BREAKPOINT } from '../constants';
import { useInquery } from '../../restClient';

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

const makeSubmitHandler = (transactionInquery, handleSubmit) =>
  handleSubmit(({ amount, correspondentID: id }, event) => {
    event.preventDefault();
    transactionInquery.send({
      endpoint: `/api/transaction`,
      method: 'POST',
      body: JSON.stringify({ amount, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });

function TransactionForm() {
  const { actions } = useStyles();
  const validations = useForm();
  const transactionInquery = useInquery('transaction');

  const { errors, handleSubmit, register, setValue, triggerValidation } = validations;
  const { correspondent, correspondentID, amount } = errors;
  const corrError = correspondent || correspondentID;

  return (
    <form onSubmit={makeSubmitHandler(transactionInquery, handleSubmit)}>
      <TextInputAutocomplete
        name="correspondent"
        label="Correspondent"
        endpoint="/autocomplete"
        onSelect={({ id, name }) => {
          setValue('correspondentID', id);
          setValue('correspondent', name);
          triggerValidation({ name: 'correspondentID' });
        }}
        onReset={() => {
          setValue('correspondentID', '');
          triggerValidation({ name: 'correspondentID' });
        }}
        handleInputRef={register({
          minLength: {
            value: 2,
            message: 'Minimum 2 sybmols for search',
          },
        })}
        error={!!corrError}
        helperText={corrError && corrError.message}
      />
      <TextField
        style={{ display: 'none' }}
        name="correspondentID"
        type="text"
        inputRef={register({
          required: 'Select from the dropdown list',
        })}
      />
      <TextInput
        name="amount"
        type="number"
        label="Amount"
        defaultValue=""
        inputProps={{ step: 0.01 }}
        inputRef={register({
          required: 'Required field',
          max: {
            value: 500,
            message: 'The balance is not enough',
          },
        })}
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
