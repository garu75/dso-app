import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import EngagementsDisplay from './screens/EngagementsDisplay';

// TODO: extract to env
const httpLink = createHttpLink({ uri: 'http://localhost:8080/graphql', 
credentials: 'include'
 });

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={EngagementsDisplay} />
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
