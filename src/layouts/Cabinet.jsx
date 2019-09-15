import React from 'react';

import DefaultContainer from '../blocks/DefaultContainer';
import UserInfo from '../blocks/UserInfo';

const CabinetLayout = () => (
  <DefaultContainer>
    <UserInfo />
    <div style={{ border: '1px solid', height: '900px' }}>Listing</div>
  </DefaultContainer>
);

export default CabinetLayout;
