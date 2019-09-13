import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.palette.primary.light,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    padding: theme.spacing(1, 2),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 1),
    },
    '$ > *': {
      flexShrink: 0,
    },
  },
  text: {
    marginRight: theme.spacing(2),
  },
}));

function Header() {
  const { header, text } = useStyles();
  const matches = useMediaQuery(theme => theme.breakpoints.down('xs'));
  return (
    <header className={header}>
      <span className={text}>Name - Pavel, account - 50 PW</span>
      <Button variant="outlined" size={matches ? 'large' : 'medium'}>
        Logout
      </Button>
    </header>
  );
}

export default Header;
