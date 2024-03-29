import React, { useContext } from 'react';
import { useRouter } from 'next/router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';

import ButtonWithSpinner from '../ButtonWithSpinner';
import useStyles from './UserInfo.styles';

import { Context } from '../../appProvider';
import { useInquery } from '../../restClient';

function UserInfo() {
  const { card, content, divider, logoutButton } = useStyles();
  const logoutInquery = useInquery('logout', { endpoint: '/logout' });
  const userInquery = useInquery('user');
  const { nextRoutingOccur } = useContext(Context);
  const router = useRouter();

  const isLoading = logoutInquery.get('isLoading');

  const handleLogout = () => {
    logoutInquery.send().then(() => {
      if (logoutInquery.get('error')) return;
      userInquery.reset();
      router.push('/');
    });
  };

  return (
    <Card component="figure" className={card}>
      <CardContent className={content}>
        <Typography noWrap>{userInquery.get('data.name')}</Typography>
        <Typography noWrap>Account: {userInquery.get('data.account')}</Typography>
        <Divider className={divider} />
        <ButtonWithSpinner
          variant="contained"
          color="primary"
          className={logoutButton}
          busy={isLoading || nextRoutingOccur}
          onClick={handleLogout}
        >
          Logout
          <ExitToApp />
        </ButtonWithSpinner>
      </CardContent>
    </Card>
  );
}

export default UserInfo;
