import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import './App.css';
import EngagementsDisplay from './screens/EngagementsDisplay';


const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql/', // TODO: extract to env
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <EngagementsDisplay />
      </div>
    </ApolloProvider>
  );
}

export default App;
