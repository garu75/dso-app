import { gql } from '@apollo/client';

export interface LoginInput {
  email: string;
  password: string;
}

export interface UserInput {
  user: {
    name: string;
    phone: string;
    email: string;
    password: string;
    gender: string;
    skills: string[];
    role: string;
    major: string;
    year?: number;
    experience: string;
    timetable: string;
  }
}

export interface GetUserData {
  name: string;
  phone: string;
  email: string;
  profileImage: string;
  skills: string[];
  role: string;
  major: string;
  year: number;
  experience: string;
  timetable: string;
  completedEngagements: [];
  acceptedEngagements: [];
  savedEngagements: [];
}

export const REGISTER = gql`
mutation register($user: UserInput!) {
    register(user: $user) {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        title
      }
      acceptedEngagements {
        title
      }
      savedEngagements {
        title
      }
    }
  }
`;

export const LOGIN = gql`
mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        title
      }
      acceptedEngagements {
        title
      }
      savedEngagements {
        title
      }
    }
  }
`;

export const LOGOUT = gql`
mutation logout {
  logout
}
`;

export const CHECK_AUTH = gql`
query checkAuth {
  checkAuth
}
`;

export const GET_MY_INFO = gql`
query getMyInfo {
  getMyInfo {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        _id
        title
        engagementType
        frequency
        description
        location
        eventStartTime
        eventEndTime
        skillsRequired
        status
      }
      acceptedEngagements {
        _id
        title
        engagementType
        frequency
        description
        location
        eventStartTime
        eventEndTime
        skillsRequired
        status
      }
      savedEngagements {
        _id
        title
        engagementType
        frequency
        description
        location
        eventStartTime
        eventEndTime
        skillsRequired
        status
      }
    }
}
`;

export const UPLOAD_PROFILE_IMAGE = gql`
mutation uploadProfileImage($profileImage: String!) {
  uploadProfileImage(profileImage: $profileImage) {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        title
      }
      acceptedEngagements {
        title
      }
      savedEngagements {
        title
      }
    }
}
`;

export const SAVE_ENGAGEMENT = gql`
mutation saveEngagement($engagementId: ID!) {
  saveEngagement(engagementId: $engagementId) {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        title
      }
      acceptedEngagements {
        title
      }
      savedEngagements {
        title
      }
    }
}
`;

export const ACCEPT_ENGAGEMENT = gql`
mutation acceptEngagement($engagementId: ID!) {
  acceptEngagement(engagementId: $engagementId) {
      name
      phone
      email
      profileImage
      skills
      role
      major
      year
      experience
      timetable
      completedEngagements {
        title
      }
      acceptedEngagements {
        title
      }
      savedEngagements {
        title
      }
    }
}
`;