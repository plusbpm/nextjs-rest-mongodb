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
      fontSize: theme.typography.h5.fontSize,
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    fieldLabel: {
      fontSize: theme.typography.h5.fontSize,
      left: theme.spacing(1),
      top: theme.spacing(-0.5),
    },
    fieldHelper: {
      paddingLeft: theme.spacing(1),
    },
  },
}));
