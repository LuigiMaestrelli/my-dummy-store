import { createTheme } from '@mui/material/styles';
import { red, grey, yellow } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    action: {
      active: yellow.A400
    },
    error: {
      main: red.A400
    },
    background: {
      default: grey.A200
    }
  },
  typography: {
    h5: {
      fontSize: 18
    }
  },
  shape: {
    borderRadius: 6
  },
  components: {
    MuiTypography: {}
  }
});

export default theme;
