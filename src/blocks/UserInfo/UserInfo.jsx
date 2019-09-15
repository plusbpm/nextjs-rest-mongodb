import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import ButtonWithSpinner from '../ButtonWithSpinner';

import useStyles from './UserInfo.styles';

function UserInfo() {
  const { card, content, divider, texts } = useStyles();

  return (
    <Card component="figure" className={card}>
      <CardContent className={content}>
        <div className={texts}>
          <Typography noWrap>Name</Typography>
          <Typography noWrap>Your balance: 500</Typography>
        </div>
        <Divider className={divider} />
        <ButtonWithSpinner variant="contained" color="primary">
          Logout
        </ButtonWithSpinner>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
