import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';
import { UserModel } from './models/users/users.model';

// Initialise environment
dotenv.config();


// Create a new express application instance
const app: express.Application = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
  credentials: true // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));
app.use(cookieParser());

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: async ({ req, res }) => {
    const token = (req.cookies ? req.cookies['authToken'] : '')|| '';
    console.log('token' + token);
    try {
      const user = await UserModel.findByToken(token);
      return { user, res };
    } catch(err) {
      return { user: null, res };
    }
  },
  formatError: (err) => {
    console.log(err)
    return err;
  }
});
server.applyMiddleware({ app, cors: false });


//Connect MongoDB
const connect = mongoose
  .connect(process.env.MONGO_SECRET || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
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