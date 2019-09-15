import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  card: {
    display: 'inline-block',
    position: 'fixed',
    top: 0,
    right: 0,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingBottom: `${theme.spacing(2)}px !important`,
  },
  divider: {
    alignSelf: 'stretch',
    margin: theme.spacing(2, -2),
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      margin: 0,
      left: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
      borderRadius: 0,
    },
    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    texts: {
      '& > p': {
        display: 'inline-block',
        marginRight: theme.spacing(2),
      },
    },
    divider: {
      display: 'none',
    },
  },
}));
