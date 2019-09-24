import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import ListController from '../../blocks/ListController';
import Filter from './Filter';
// import Sort from './Sort';

function Subheader() {
  return (
    <>
      <ListSubheader disableSticky>
        <Typography variant="h6" gutterBottom color="textPrimary">
          Transactions history
        </Typography>
      </ListSubheader>
      <ListController
        component={Filter}
        prefix="filter"
        hideLabel="Hide filters"
        showLabel="Show filters"
        list={[
          { id: 'name', type: 'text', label: 'Correspondent name' },
          { id: 'amount', type: 'number', min: 0.01, max: 500, label: 'Amount' },
          {
            id: 'date',
            type: 'date',
            min: '2019-09-23T00:00:000Z',
            max: '2019-09-24T00:00:000Z',
            label: 'Date',
          },
        ]}
      />
      {/* <Sort /> */}
    </>
  );
}

export default Subheader;
