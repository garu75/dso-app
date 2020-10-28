import { gql } from '@apollo/client';

export type SortSettings = {
  sortField: string;
  order: number;
  skip: number;
  perPage: number;
}

export type FilterFields = {
  field: string | null;
  fieldValues: string[];
}

export interface GetEngagementsVariables {
  sortSettings: SortSettings;
  filterFields: FilterFields;
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
  query getEngagements($sortSettings: SortSettings!, $filterFields: FilterFields!) {
    result: getEngagements(sortSettings: $sortSettings, filterFields: $filterFields) {
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