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
