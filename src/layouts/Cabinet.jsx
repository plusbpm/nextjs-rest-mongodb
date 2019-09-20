import React from 'react';

import DefaultContainer from '../blocks/DefaultContainer';
import UserInfo from '../blocks/UserInfo';
import TransactionList from '../blocks/TransactionList';
import InqueriesErrorSnackbar from '../blocks/InqueriesErrorSnackbar';

const CabinetLayout = () => (
  <>
    <UserInfo />
    <DefaultContainer>
      <TransactionList />
    </DefaultContainer>
    <InqueriesErrorSnackbar />
  </>
);

export default CabinetLayout;
