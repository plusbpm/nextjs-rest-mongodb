import React from 'react';
import get from 'lodash/get';

import { makeStyles } from '@material-ui/core/styles';

import DefaultContainer from '../../../blocks/DefaultContainer';
import UserInfo from '../../../blocks/UserInfo';
import TransactionForm from '../../../blocks/TransactionForm';
import InqueriesErrorSnackbar from '../../../blocks/InqueriesErrorSnackbar';

import { LAYOUT_BREAKPOINT } from '../../../blocks/constants';
import redirectWith from '../../redirectWith';

const useStyles = makeStyles(theme => ({
  transaction: {
    [theme.breakpoints.up(LAYOUT_BREAKPOINT)]: {
      paddingRight: theme.spacing(25),
    },
    [theme.breakpoints.down(LAYOUT_BREAKPOINT)]: {
      paddingRight: theme.spacing(3),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0, 0),
    },
  },
}));

const Transaction = () => {
  const { transaction } = useStyles();
  return (
    <>
      <UserInfo />
      <DefaultContainer className={transaction} maxWidth="lg">
        <TransactionForm />
      </DefaultContainer>
      <InqueriesErrorSnackbar />
    </>
  );
};

Transaction.getInitialProps = async ctx => {
  redirectWith(ctx, '/', userId => !userId);
  const transactionID = get(ctx, 'query.transactionID');
  if (!transactionID) return null;

  return ctx.restClient
    .getInquery('baseTransaction', {
      endpoint: '/private/transaction',
      query: { transactionID },
    })
    .send();
};

export default Transaction;
