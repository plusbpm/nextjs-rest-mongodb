import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';

import ButtonWithSpinner from '../ButtonWithSpinner';

import useStyles from './UserInfo.styles';

function UserInfo() {
  const { card, content, divider, logoutButton } = useStyles();

  return (
    <Card component="figure" className={card}>
      <CardContent className={content}>
        <Typography noWrap>Name</Typography>
        <Typography noWrap>Account: 500</Typography>
        <Divider className={divider} />
        <ButtonWithSpinner variant="contained" color="primary" className={logoutButton}>
          Logout
          <ExitToApp />
        </ButtonWithSpinner>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
