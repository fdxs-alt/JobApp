import { gql } from '@apollo/client';

export const GET_User = gql`
  query getUser {
    getUser {
      id
      email
      confirmed
      hasCompany
      fullName
    }
  }
`;
export const IS_AUTH = gql`
  query IsAuth {
    isAuthenticated @client
  }
`;
export const IS_OWNER = gql`
  query IsOwner {
    isOwner @client
  }
`;
