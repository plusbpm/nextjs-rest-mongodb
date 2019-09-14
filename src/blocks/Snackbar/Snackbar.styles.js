import { makeStyles } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';

export default makeStyles({
  initial: {
    display: 'none',
  },
  open: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  info: {
    backgroundColor: lightBlue[600],
  },
  warning: {
    backgroundColor: deepOrange[500],
  },
  success: {
    backgroundColor: green[600],
  },
  icon: {
    fontSize: 20,
  },
});
