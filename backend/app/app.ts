import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import mongoose from 'mongoose';
import User from './models/User';
import dotenv from 'dotenv';
import typeDefs from './schema';
import resolvers from './resolvers';

// Initialise environment
dotenv.config();


// Create a new express application instance
const app: express.Application = express();
const server = new ApolloServer({ typeDefs, resolvers });
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

// server.js
app.get("/users", async (req, res) => {
  const users = await User.find();

  res.json(users);
 });

 app.get("/user-create", async (req, res) => {
  const user = new User({ username: "userTest" });
  await user.save().then(() => console.log('User created'));
  
  res.send("User created \n");
 });

const PORT = process.env.PORT;

app.listen(PORT, function () {
  console.log(`Server running, listening on port ${PORT}`);
});