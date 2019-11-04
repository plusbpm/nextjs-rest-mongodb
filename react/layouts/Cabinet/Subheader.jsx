import React from 'react';

import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';

import QueryController from '../../blocks/QueryController';
import Filter from './Filter';
import Sorting from './Sorting';

const filters = [
  { id: 'correspondent', type: 'text', label: 'Correspondent name' },
  { id: 'amount', type: 'number', min: 0.01, max: 500, label: 'Amount' },
  {
    id: 'date',
    type: 'date',
    min: '2019-09-23T00:00:000Z',
    max: '2019-09-24T00:00:000Z',
    label: 'Date',
  },
];

const sortings = [
  { id: 'correspondent', label: 'Name' },
  { id: 'amount', label: 'Amount' },
  { id: 'dt', label: 'Date' },
];

function Subheader() {
  return (
    <>
      <ListSubheader disableSticky>
        <Typography variant="h6" gutterBottom color="textPrimary">
          Transactions history
        </Typography>
      </ListSubheader>
      <QueryController hideLabel="Hide filters" showLabel="Show filters">
        {filters.map(data => (
          <Filter key={data.id} {...data} />
        ))}
      </QueryController>
      <QueryController hideLabel="Hide sortings" showLabel="Show sortings">
        <Sorting list={sortings} />
      </QueryController>
    </>
  );
}

export default Subheader;
