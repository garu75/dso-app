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
  skills: string[];
  role: string;
  completedAssignments: [];
  acceptedAssignments: [];
  savedAssignments: [];
}

export const REGISTER = gql`
mutation register($user: UserInput!) {
    register(user: $user) {
      name
      phone
      email
      skills
      role
      completedAssignments {
        title
      }
      acceptedAssignments {
        title
      }
      savedAssignments {
        title
      }
    }
  }
`;

export const LOGIN = gql`
query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      phone
      email
      skills
      role
      completedAssignments {
        title
      }
      acceptedAssignments {
        title
      }
      savedAssignments {
        title
      }
    }
  }
`;

export const CHECK_AUTH = gql`
query checkAuth {
  checkAuth
}
`;