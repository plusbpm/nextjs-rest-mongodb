import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

function TransactionList() {
  return (
    <div
      style={{
        border: '1px solid',
        height: '900px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <List>
        <ListItem />
      </List>
    </div>
  );
}

export default TransactionList;
