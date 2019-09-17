import { makeStyles } from '@material-ui/core/styles';
import { LAYOUT_BREAKPOINT } from '../../blocks/constants';

export default makeStyles(theme => ({
  container: {
    [theme.breakpoints.down(LAYOUT_BREAKPOINT)]: {
      // padding: theme.spacing(10, 0, 0, 0),
    },
  },
}));
