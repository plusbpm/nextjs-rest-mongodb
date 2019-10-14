import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import DefaultContainer from '../../blocks/DefaultContainer';
import UserInfo from '../../blocks/UserInfo';
import TransactionList from '../../blocks/TransactionList';
import InqueriesErrorSnackbar from '../../blocks/InqueriesErrorSnackbar';
import Pagination from '../../blocks/Pagination';
import { LAYOUT_BREAKPOINT } from '../../blocks/constants';

import Subheader from './Subheader';
import redirectWith from '../redirectWith';

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
  return (
    <>
      <UserInfo />
      <DefaultContainer className={cabinet} maxWidth="lg">
        <TransactionList subheader={<Subheader />} />
        <Pagination total={50000} itemsPerPage={5} />
      </DefaultContainer>
      <InqueriesErrorSnackbar />
    </>
  );
};

CabinetLayout.getInitialProps = async ctx => {
  redirectWith(ctx, '/', userId => !userId);
};

export default CabinetLayout;
