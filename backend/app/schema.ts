import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar Date
  
  type Query {
    checkAuth: Boolean
    getMyInfo: User
    getEngagement(_id: ID): Engagement
    getAllEngagements: [Engagement]
    getEngagements(startId: ID!, perPage: Int!): [Engagement]
    searchEngagements(searchString: String): [Engagement]
  }
  type Mutation {
    login(email: String!, password: String!): User
    logout: Boolean
    register(user: UserInput!): User
    uploadProfileImage(profileImage: String!): User
    createEngagement(engagement: EngagementInput!): Engagement
    updateEngagement(engagement: EngagementInput!): Engagement
    deleteEngagement(_id: ID): Boolean
    acceptEngagement(engagementId: ID): User
    completeEngagement(engagementId: ID): User
    saveEngagement(engagementId: ID): User
  }
  input UserInput {
    name: String!
    phone: String!
    email: String!
    password: String!
    gender: String!
    skills: [String]
    role: String!
    major: String
    year: Int
    experience: String
    timetable: String
  }
  type User {
    name: String
    phone: String
    email: String
    profileImage: String
    gender: String
    skills: [String]
    role: String
    major: String
    year: Int
    experience: String
    timetable: String
    completedEngagements: [Engagement]
    acceptedEngagements: [Engagement]
    savedEngagements: [Engagement]
  }
  input EngagementInput {
    _id: ID
    title: String!
    engagementType: String!
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
  type Engagement {
    _id: ID
    title: String
    engagementType: String
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