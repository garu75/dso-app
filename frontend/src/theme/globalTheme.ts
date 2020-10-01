import { createMuiTheme } from "@material-ui/core";

const appTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
      contrastText: '#000',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif'
  }
});

export default appTheme;