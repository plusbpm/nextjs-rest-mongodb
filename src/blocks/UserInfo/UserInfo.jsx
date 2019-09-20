import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { LAYOUT_BREAKPOINT } from '../constants';
import ButtonWithSpinner from '../ButtonWithSpinner';
import useStyles from './UserInfo.styles';

function UserInfo() {
  const { card, content, divider, logoutButton } = useStyles();
  const mobile = useMediaQuery(theme => theme.breakpoints.down(LAYOUT_BREAKPOINT));

  return (
    <Card component="figure" className={card}>
      <CardContent className={content}>
        <Typography noWrap>Name</Typography>
        <Typography noWrap>Account: 500</Typography>
        <Divider className={divider} />
        <ButtonWithSpinner
          variant="contained"
          color="primary"
          size={mobile ? 'small' : 'medium'}
          className={logoutButton}
        >
          Logout
          <ExitToApp />
        </ButtonWithSpinner>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
