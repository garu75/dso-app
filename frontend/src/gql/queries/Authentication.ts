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