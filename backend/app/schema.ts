import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  
  type Query {
    login(email: String!, password: String!): User
    register(name: String!, email: String!, password: String!): User
    getAssignment(_id: ID): Assignment
    getAllAssignments: [Assignment]
  }
  type Mutation {
    createAssignment(assignment: AssignmentInput!): Assignment
    updateAssignment(assignment: AssignmentInput!): Assignment
    deleteAssignment(_id: ID): Boolean
  }
  type User {
    name: String
    email: String
  }
  input AssignmentInput {
    _id: ID
    title: String!
    assignmentType: String!
    frequency: String!
    description: String!
    location: String!
    eventStartTime: Date
    eventEndTime: Date
    skillsRequired: [String]
    tags: [String]
    major: String
    needMajorMatch: Boolean
  }
  type Assignment {
    _id: ID
    title: String
    assignmentType: String
    frequency: String
    description: String
    location: String
    eventStartTime: Date
    eventEndTime: Date
    skillsRequired: [String]
    tags: [String]
    major: String
    needMajorMatch: Boolean
  }
`;

export default typeDefs;