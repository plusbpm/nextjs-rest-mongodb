import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  fieldLabel: {
    whiteSpace: 'nowrap',
  },
  [theme.breakpoints.down('xs')]: {
    field: {
      marginBottom: theme.spacing(1),
    },
    fieldInput: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    fieldLabel: {
      left: theme.spacing(1),
    },
    fieldHelper: {
      paddingLeft: theme.spacing(1),
    },
  },
}));
