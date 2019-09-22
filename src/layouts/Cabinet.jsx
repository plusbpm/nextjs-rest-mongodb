import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import DefaultContainer from '../blocks/DefaultContainer';
import UserInfo from '../blocks/UserInfo';
import TransactionList from '../blocks/TransactionList';
import InqueriesErrorSnackbar from '../blocks/InqueriesErrorSnackbar';
import Pagination from '../blocks/Pagination';
import { LAYOUT_BREAKPOINT } from '../blocks/constants';

const useStyles = makeStyles(theme => ({
  cabinet: {
    minWidth: undefined,
    [theme.breakpoints.up(LAYOUT_BREAKPOINT)]: {
      paddingRight: theme.spacing(25),
    },
    [theme.breakpoints.down(LAYOUT_BREAKPOINT)]: {
      paddingRight: theme.spacing(3),
    },
  },
}));

const CabinetLayout = () => {
  const { cabinet } = useStyles();
  return (
    <>
      <UserInfo />
      <DefaultContainer className={cabinet} maxWidth={false}>
        <TransactionList />
        <Pagination total={50000} itemsPerPage={5} />
      </DefaultContainer>
      <InqueriesErrorSnackbar />
    </>
  );
};

export default CabinetLayout;
