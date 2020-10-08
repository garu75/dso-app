import { gql } from '@apollo/client';

export interface GetAssignmentsVariables {
  startId: string;
  perPage: number;
}

export interface GetAssignmentsData {
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

export const GET_ASSIGNMENTS = gql`
  query getAssignments($startId: ID!, $perPage: Int!) {
    result: getAssignments(startId: $startId, perPage: $perPage) {
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