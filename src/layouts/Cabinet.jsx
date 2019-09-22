import React from 'react';

import DefaultContainer from '../blocks/DefaultContainer';
import UserInfo from '../blocks/UserInfo';
import TransactionList from '../blocks/TransactionList';
import InqueriesErrorSnackbar from '../blocks/InqueriesErrorSnackbar';
import Pagination from '../blocks/Pagination';

const CabinetLayout = () => (
  <>
    <UserInfo />
    <DefaultContainer>
      <TransactionList />
      <Pagination total={50000} itemsPerPage={5} />
    </DefaultContainer>
    <InqueriesErrorSnackbar />
  </>
);

export default CabinetLayout;
