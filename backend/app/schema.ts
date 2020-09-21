import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    login(email: String!, password: String!): User
    register(name: String!, email: String!, password: String!): User
  }
  type User {
    name: String
    email: String
  }
`;

export default typeDefs;