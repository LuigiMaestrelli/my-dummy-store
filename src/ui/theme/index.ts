import { createTheme } from '@mui/material/styles';
import { red, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'light',
    error: {
      main: red.A400
    },
    background: {
      default: grey.A200
    }
  },
  shape: {
    borderRadius: 6
  }
});

export default theme;
