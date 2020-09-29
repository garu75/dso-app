import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';
import { UserModel } from './models/users/users.model';

// Initialise environment
dotenv.config();


// Create a new express application instance
const app: express.Application = express();
const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({ req, res }) => {
    const cookies = req.headers.cookie?.split('=');

    const token = cookies ? 
      cookies[cookies.findIndex(val => val === 'authToken') + 1] 
      : '';
    try {
      const user = await UserModel.findByToken(token);
      return { user, res };
    } catch(err) {
      return { user: null, res};
    }
  }
});
server.applyMiddleware({ app });

//Connect MongoDB
const connect = mongoose
  .connect(process.env.MONGO_SECRET || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

app.get('/', function (req, res) {
  res.send('Test success');
});

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server running, listening on port ${PORT}`);
});