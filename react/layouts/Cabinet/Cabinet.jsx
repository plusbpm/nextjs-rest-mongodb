import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CABINET__LIST_PER_PAGE } from '../../../shared/constants';

import DefaultContainer from '../../blocks/DefaultContainer';
import UserInfo from '../../blocks/UserInfo';
import TransactionList from '../../blocks/TransactionList';
import InqueriesErrorSnackbar from '../../blocks/InqueriesErrorSnackbar';
import Pagination from '../../blocks/Pagination';
import { LAYOUT_BREAKPOINT } from '../../blocks/constants';

import Subheader from './Subheader';
import redirectWith from '../redirectWith';
import { useInquery } from '../../restClient';

const useStyles = makeStyles(theme => ({
  cabinet: {
    minWidth: undefined,
    marginBottom: theme.spacing(2),
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

const CabinetLayout = () => {
  const { cabinet } = useStyles();
  const listInquery = useInquery('transactionsList');
  const data = listInquery.get('data');
  const { list = [], total = 0 } = data || {};
  return (
    <>
      <UserInfo />
      <DefaultContainer className={cabinet} maxWidth="lg">
        <TransactionList
          subheader={<Subheader />}
          list={list}
          total={total}
          isLoading={listInquery.get('isLoading')}
          hasData={!!data}
        />
        <Pagination total={total} itemsPerPage={CABINET__LIST_PER_PAGE} />
      </DefaultContainer>
      <InqueriesErrorSnackbar />
    </>
  );
};

CabinetLayout.getInitialProps = async ctx => {
  if (redirectWith(ctx, '/', userId => !userId)) return undefined;

  return ctx.restClient
    .getInquery('transactionsList', {
      endpoint: '/private/transactions',
      throwErrors: true,
    })
    .send({ query: ctx.query });
};

export default CabinetLayout;
