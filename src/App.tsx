import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import HomeDisplay from './screens/HomeDisplay';
import appTheme from './theme/globalTheme';

// TODO: extract to env
const httpLink = createHttpLink({
  uri: 'https://dso-app-backend.et.r.appspot.com/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={appTheme}>
        <div className="App">
          <Router>
            <Switch>
              <Route path="/" component={HomeDisplay} />
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
