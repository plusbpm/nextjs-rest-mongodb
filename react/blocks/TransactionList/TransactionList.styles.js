import { makeStyles } from '@material-ui/core/styles';

const ellipsisStyles = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export default makeStyles(theme => ({
  list: {
    '&.loading .item': {
      opacity: 0.4,
    },
    minWidth: 230,
    '& .item:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  text: {
    ...ellipsisStyles,
    '& .MuiListItemText-secondary': ellipsisStyles,
  },
  secondaryAction: {
    right: theme.spacing(1),
  },
}));
