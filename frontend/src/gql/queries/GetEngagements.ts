import { gql } from '@apollo/client';

export interface GetEngagementsVariables {
  startId: string;
  perPage: number;
}

export interface GetEngagementsData {
  result: {
    _id: string;
    title: string;
    frequency: string;
    description: string;
    location: string;
    eventStartTime: string;
    eventEndTime: string;
  }[];
}

export interface EngagementFields {
  _id: string;
  title: string;
  frequency: string;
  description: string;
  location: string;
  eventStartTime: string;
  eventEndTime: string;
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
    }
  }
`;