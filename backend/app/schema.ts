import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    users: [User]
  }
  type User {
    name: String
    matric: String
  }
`;

export default typeDefs;