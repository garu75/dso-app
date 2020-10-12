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

export const appColors = {
  coral: '#ff6b6c',
  mediumRed: '#EF7471',
  blueGray: '#5b5f97',
  turquoise: '#12cdd0',
  yellow: '#ffc145',
  white: '#fff',
  ghostWhite: '#f3f3f7',
  blushWhite: '#ffebeb',
  laceWhite: '#fff8eb',
  azureWhite: '#ecfdfd',
}

export default appTheme;