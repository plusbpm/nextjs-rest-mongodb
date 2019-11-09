import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  bage: {
    top: theme.spacing(-1.5),
    right: theme.spacing(-1.125),
  },
  wrap: {
    '& .filterField': {
      '& input': {
        paddingLeft: theme.spacing(2),
      },
      '& label': {
        paddingLeft: theme.spacing(2),
      },
      '& label.MuiInputLabel-shrink': {
        left: theme.spacing(0.5),
      },
      '& > p': {
        paddingLeft: theme.spacing(2),
      },
    },
    '& .switch-button, .submit-button, .reset-button': {
      '&.open': {
        marginTop: theme.spacing(1),
      },
      marginLeft: theme.spacing(2),
    },
    padding: theme.spacing(0, 0, 2, 0),
    [theme.breakpoints.down('xs')]: {
      '& .switch-button, .submit-button, .reset-button': {
        marginLeft: theme.spacing(2),
        marginBottom: theme.spacing(1),
      },
      '& .filterField label': {
        left: 0,
      },
    },
  },
}));
