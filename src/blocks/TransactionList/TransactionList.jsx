import React from 'react';
import Range from 'lodash/range';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
// import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import useStyles from './TransactionList.styles';

function TransactionList() {
  const { table } = useStyles();
  return (
    <Table className={table}>
      <TableHead>
        <TableRow>
          <TableCell>Correspondent Name</TableCell>
          <TableCell>Operation</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Date/Time</TableCell>
          <TableCell>Account</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Range(0, 30).map(key => (
          <TableRow hover key={key}>
            <TableCell>Correspondent {key}</TableCell>
            <TableCell>{key % 2 ? 'Debit' : 'Credit'}</TableCell>
            <TableCell>{key} PW</TableCell>
            <TableCell>1 hour ago</TableCell>
            <TableCell>account: {500 - key}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TransactionList;
