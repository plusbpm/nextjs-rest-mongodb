import { makeStyles } from '@material-ui/core/styles';

const ellipsisStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export default makeStyles(theme => ({
  list: {
    minWidth: 230,
  },
  text: {
    ...ellipsisStyles,
    '& .MuiListItemText-secondary': ellipsisStyles,
  },
  secondaryAction: {
    right: theme.spacing(1),
  },
}));
