import { makeStyles } from '@material-ui/core/styles';
import { LAYOUT_BREAKPOINT } from '../constants';

export default makeStyles(theme => ({
  card: {
    display: 'inline-block',
    position: 'fixed',
    top: 0,
    right: 0,
    margin: theme.spacing(2),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    paddingBottom: `${theme.spacing(2)}px !important`,
    '& > p': {
      maxWidth: theme.spacing(20),
    },
  },
  divider: {
    alignSelf: 'stretch',
    margin: theme.spacing(2, -2),
  },
  logoutButton: {
    flexShrink: 0,
    '& svg': {
      marginLeft: theme.spacing(2),
    },
  },
  [theme.breakpoints.down(LAYOUT_BREAKPOINT)]: {
    card: {
      position: 'sticky',
      top: 0,
      width: '100%',
      margin: 0,
      borderBottom: `1px solid ${theme.palette.divider}`,
      boxShadow: 'none',
      borderRadius: 0,
    },
    content: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > p': {
        marginRight: theme.spacing(2),
        maxWidth: 'unset',
      },
    },
    divider: {
      display: 'none',
    },
  },
}));
