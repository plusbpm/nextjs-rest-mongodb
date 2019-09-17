import React from 'react';

import DefaultContainer from '../../blocks/DefaultContainer';
import UserInfo from '../../blocks/UserInfo';
import TransactionList from '../../blocks/TransactionList';

import useStyles from './Cabinet.styles';

const CabinetLayout = () => {
  const { container } = useStyles();
  return (
    <>
      <UserInfo />
      <DefaultContainer className={container}>
        <TransactionList />
      </DefaultContainer>
    </>
  );
};

export default CabinetLayout;
