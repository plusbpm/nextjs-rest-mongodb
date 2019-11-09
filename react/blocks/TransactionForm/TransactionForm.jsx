import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import BackWithFallback from '../BackWithFallback';
import ButtonWithSpinner from '../ButtonWithSpinner';
import TextInput from '../TextInput';
import TextInputSuggest from '../TextInputSuggest';
import { LAYOUT_BREAKPOINT } from '../constants';
import { useInqueriesMap } from '../../restClient';
import useFormValidation from '../useFormValidation';

import createValidation from '../../../shared/validation';
import schemas from '../../../shared/validation/forms/transactionPost';

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
  successCard: {
    margin: theme.spacing(2, 0, 1, 0),
  },
  successActions: {
    justifyContent: 'flex-end',
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
  const router = useRouter();
  const { baseTransaction, transaction } = useInqueriesMap({
    ids: ['transaction', 'baseTransaction'],
  });
  const isEdit = !!router.query.transactionID;

  const { actions, successCard, successActions } = useStyles();
  const [corrID, setCorrID] = useState(
    isEdit ? baseTransaction.get('data.correspondentID', '') : '',
  );
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => setSuccess(true);
  const handleSuccessClose = () => setSuccess(false);

  const [formProps, errors] = useFormValidation({
    validate,
    submit: makeSubmitHandler(transaction, handleSuccess),
  });

  const { correspondent, correspondentID, amount } = errors;
  const corrError = correspondent || correspondentID;

  if (success)
    return (
      <Card className={successCard}>
        <CardContent>
          <Typography color="textPrimary" component="p" variant="h6" gutterBottom>
            Transaction completed successfully
          </Typography>
        </CardContent>
        <CardActions className={successActions}>
          <Link href="/cabinet">
            <Button size="small" color="primary">
              To history
            </Button>
          </Link>
          <Button size="small" color="primary" onClick={handleSuccessClose}>
            Make another transaction
          </Button>
        </CardActions>
      </Card>
    );

  return (
    <form {...formProps}>
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
        defaultValue={isEdit ? baseTransaction.get('data.correspondent', '') : ''}
      />
      <TextField name="correspondentID" type="hidden" value={corrID} />
      <TextInput
        name="amount"
        type="number"
        label="Amount"
        defaultValue={isEdit ? baseTransaction.get('data.amount') : ''}
        inputProps={{ step: 0.01 }}
        error={!!amount}
        helperText={amount && amount.message}
        disabled={success}
      />
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
