import { gql } from '@apollo/client';

export interface GetEngagementsVariables {
  startId: string;
  perPage: number;
}

export interface GetEngagementsData {
  result: {
    _id: string;
    title: string;
    engagementType: string;
    frequency: string;
    description: string;
    location: string;
    eventStartTime: string;
    eventEndTime: string;
    skillsRequired: string[];
    isSaved: boolean;
  }[];
}

export interface EngagementFields {
  _id: string;
  title: string;
  engagementType: string;
  frequency: string;
  description: string;
  location: string;
  eventStartTime: string;
  eventEndTime: string;
  skillsRequired: string[];
  status: string;
  isSaved: boolean;
}

export const GET_ENGAGEMENTS = gql`
  query getEngagements($startId: ID!, $perPage: Int!) {
    result: getEngagements(startId: $startId, perPage: $perPage) {
      _id
      title
      frequency
      description
      location
      eventStartTime
      eventEndTime
      isSaved
    }
  }
`;

export const GET_ENGAGEMENT = gql`
query getEngagement($_id: ID!) {
  result: getEngagement(_id: $_id) {
    _id
    title
    frequency
    engagementType
    description
    location
    eventStartTime
    eventEndTime
    skillsRequired
    status
    isSaved
  }
}
`;