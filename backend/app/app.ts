import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import typeDefs from './schema';
import resolvers from './resolvers';




// Create a new express application instance
const app: express.Application = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.get('/', function (req, res) {
  res.send('Test success');
});

app.listen(3000, function () {
  console.log('Server running, listening on port 3000');
});