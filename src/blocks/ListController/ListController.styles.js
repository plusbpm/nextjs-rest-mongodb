import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  bage: {
    top: theme.spacing(-1.5),
    right: theme.spacing(-1.125),
  },
  wrap: {
    '& .filterField': {
      '& input': {
        paddingLeft: 16,
      },
      '& label': {
        paddingLeft: 16,
      },
      '& label.MuiInputLabel-shrink': {
        left: 4,
      },
    },
    '& .switch-button': {
      '&.open': {
        marginTop: theme.spacing(1),
      },
      marginLeft: theme.spacing(2),
    },
    padding: theme.spacing(0, 0, 2, 0),
    [theme.breakpoints.down('xs')]: {
      '& .switch-button': {
        marginLeft: theme.spacing(2),
      },
      '& .filterField label': {
        left: 0,
      },
    },
  },
}));
