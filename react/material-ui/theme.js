import { createMuiTheme } from '@material-ui/core/styles';

const customTheme = {
  props: {
    // MuiButtonBase: {
    //   disableRipple: true,
    // },
    MuiButton: {
      variant: 'outlined',
    },
  },
};

export default createMuiTheme(customTheme);
