import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import { ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import EngagementsDisplay from './EngagementsDisplay';
import RegistrationDisplay from './RegistrationDisplay';
import LoginDisplay from './LoginDisplay';
import appTheme from '../theme/globalTheme';

import { CHECK_AUTH } from '../gql/queries/Authentication';
import Footer from '../components/Footer';

const HomeDisplay = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useQuery<boolean, null>(
    CHECK_AUTH,
    {
      onCompleted: (data: any) => {
        setIsLoggedIn(data.checkAuth);
      }
    })

  return (
    <ThemeProvider theme={appTheme}>
      <AppBar color='primary'>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" >
            voltch
          </Typography>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route exact path='/' component={EngagementsDisplay} />
        {isLoggedIn && <Route path="/register" component={RegistrationDisplay} /> }
        {isLoggedIn && <Route path="/login" component={LoginDisplay} /> }
      </Switch>

      <Footer />
    </ThemeProvider>
  );
}

export default HomeDisplay;