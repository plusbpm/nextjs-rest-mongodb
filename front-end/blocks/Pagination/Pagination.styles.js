import { makeStyles } from '@material-ui/core/styles';
import { PAGINATION_BUTTON_WIDTH } from '../constants';

export default makeStyles(() => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  pageButton: {
    minWidth: PAGINATION_BUTTON_WIDTH,
    maxWidth: PAGINATION_BUTTON_WIDTH,
    margin: '0px 2px',
  },
}));
