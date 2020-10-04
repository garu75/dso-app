import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  
  type Query {
    login(email: String!, password: String!): User
    register(user: UserInput!): User
    getMyInfo: User
    getAssignment(_id: ID): Assignment
    getAllAssignments: [Assignment]
    searchAssignments(searchString: String): [Assignment]
  }
  type Mutation {
    createAssignment(assignment: AssignmentInput!): Assignment
    updateAssignment(assignment: AssignmentInput!): Assignment
    deleteAssignment(_id: ID): Boolean
    acceptAssignment(assignmentId: ID): User
    completeAssignment(assignmentId: ID): User
    saveAssignment(assignmentId: ID): User
  }
  input UserInput {
    name: String!
    email: String!
    password: String!
    skills: [String]
    role: String
    major: String
  }
  type User {
    name: String
    email: String
    skills: [String]
    role: String
    completedAssignments: [Assignment]
    acceptedAssignments: [Assignment]
    savedAssignments: [Assignment]
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
    creator: ID
  }
`;

export default typeDefs;