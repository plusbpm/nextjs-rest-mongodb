import React from 'react';
import Range from 'lodash/range';

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import Replay from '@material-ui/icons/Replay';
import TrendingDown from '@material-ui/icons/TrendingDown';
import TrendingUp from '@material-ui/icons/TrendingUp';

import useStyles from './TransactionList.styles';

function TransactionList() {
  const { list, text, secondaryAction } = useStyles();
  return (
    <List
      className={list}
      subheader={
        // eslint-disable-next-line react/jsx-wrap-multilines
        <ListSubheader disableSticky>
          <Typography variant="h6" gutterBottom color="textPrimary">
            Transactions history
          </Typography>
        </ListSubheader>
      }
    >
      {Range(0, 30).map(key => {
        const isDebit = Boolean(key % 2);
        return (
          <ListItem hover key={key} dense divider>
            <Tooltip title={isDebit ? 'debit' : 'credit'}>
              <ListItemIcon>
                {isDebit ? <TrendingUp color="primary" /> : <TrendingDown color="error" />}
              </ListItemIcon>
            </Tooltip>
            <ListItemText
              className={text}
              primary={`Amount - ${key} PW; Saldo - ${500 - key}`}
              secondary={`Correspondent ${key}, 10:11 pm Jan 9, 2014`}
            />
            <ListItemSecondaryAction className={secondaryAction}>
              <Tooltip title="Repeat transaction">
                <IconButton color="secondary">
                  <Replay />
                </IconButton>
              </Tooltip>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TransactionList;
