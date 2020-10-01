import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { createStyles, makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Box } from '@material-ui/core';
import EngagementCard from '../components/EngagementCard';

const themeTest = createMuiTheme({
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
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    startTextContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      marginLeft: '16%',
      marginRight: '16%',
      marginTop: '8%',
      marginBottom: '8%',
      paddingRight: '36%',
    },
    startSubtext: {
      textAlign: 'left',
      marginTop: 40,
    },
    engagementsGridContainer: {
      backgroundColor: '#f3f3f7',
      paddingTop: 98,
      paddingBottom: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
    },
  }),
);

const EngagementsDisplay = () => {
  const classes = useStyles(themeTest);
  return (
    <ThemeProvider theme={themeTest}>
      <AppBar position="static" color='primary'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            voltch
        </Typography>
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
      <Box className={classes.startTextContainer}>
        <Typography variant='h3'>Volunteer,</Typography>
        <Typography variant='h3'>one hour at a time</Typography>
        <Typography variant='body1' className={classes.startSubtext}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Nam in faucibus justo. Sed placerat justo eu turpis posuere ultricies.
          Curabitur at arcu ac mauris laoreet fermentum at ut leo.
          Curabitur blandit sapien quis eros rutrum vehicula.
        </Typography>
      </Box>

      <Box className={classes.engagementsGridContainer}>
        <EngagementCard />
        <EngagementCard />
        <EngagementCard />
      </Box>


    </ThemeProvider>
  );
}

export default EngagementsDisplay