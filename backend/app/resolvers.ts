import { gql } from 'apollo-server-express';

const placeholderUsers = [
  {
    name: 'John Doe',
    matric: 'A1234567'
  },
  {
    name: 'Jane Moe',
    matric: 'A1231231'
  },
];

const resolvers = {
  Query: {
    users: () => placeholderUsers,
  },
};

export default resolvers;