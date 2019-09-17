import React from 'react';

import DefaultContainer from '../blocks/DefaultContainer';
import UserInfo from '../blocks/UserInfo';
import TransactionList from '../blocks/TransactionList';

const CabinetLayout = () => (
  <>
    <UserInfo />
    <DefaultContainer>
      <TransactionList />
    </DefaultContainer>
  </>
);

export default CabinetLayout;
