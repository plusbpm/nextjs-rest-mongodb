import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    minHeight: '400px',
    padding: theme.spacing(3),
  },
  actions: {
    paddingLeft: theme.spacing(0),
    paddingRight: theme.spacing(0),
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
  [theme.breakpoints.down('xs')]: {
    card: {
      padding: theme.spacing(0, 0, 2, 0),
      borderRadius: 0,
      boxShadow: 'none',
      borderTop: `1px solid ${theme.palette.divider}`,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    actions: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    mobileHeader: {
      padding: theme.spacing(1, 1),
    },
    snackbar: {
      padding: theme.spacing(1),
      margin: theme.spacing(0, 1),
    },
  },
}));
