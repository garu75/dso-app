import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, IconButton, ThemeProvider, Toolbar, Typography } from '@material-ui/core';

import './App.css';
import EngagementsDisplay from './screens/EngagementsDisplay';
import EngagementDetail from './screens/EngagementDetail';
import appTheme from './theme/globalTheme';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/', // TODO: extract to env
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
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
        <div className="App">
          {/* <EngagementsDisplay /> */}
          <EngagementDetail />
        </div>
        </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
