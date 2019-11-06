import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';

import Replay from '@material-ui/icons/Replay';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';

import useStyles from './TransactionList.styles';

function TransactionList({ hasData, isLoading, list, total, ...rest }) {
  const classes = useStyles();
  const firstLoading = isLoading && !hasData;
  if (firstLoading || total === 0)
    return (
      <List {...rest} className={classes.list}>
        <ListItem dense>
          <ListItemText primary={firstLoading ? 'Loading ...' : 'No transaction records'} />
        </ListItem>
      </List>
    );

  return (
    <List {...rest} className={`${classes.list} ${isLoading ? 'loading' : ''}`}>
      <Divider />
      {list.map(({ _id, incoming, amount, account, correspondent, dt }) => (
        <ListItem dense divider className="item" key={_id}>
          <Tooltip title={incoming ? 'debit' : 'credit'}>
            <ListItemIcon>
              {incoming ? <TrendingUp color="primary" /> : <TrendingDown color="error" />}
            </ListItemIcon>
          </Tooltip>
          <ListItemText
            className={classes.text}
            primary={`Amount - ${amount} PW; Saldo - ${account}`}
            secondary={`Correspondent: ${correspondent}, ${dt}`}
          />
          {!isLoading && (
            <Link href="/cabinet/transaction">
              <ListItemSecondaryAction className={classes.secondaryAction}>
                <Tooltip title="Repeat transaction">
                  <IconButton color="secondary">
                    <Replay />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </Link>
          )}
        </ListItem>
      ))}
    </List>
  );
}

TransactionList.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasData: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  total: PropTypes.number.isRequired,
};

export default TransactionList;
