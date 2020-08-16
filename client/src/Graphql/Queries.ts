import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    getUser {
      id
      email
      confirmed
      hasCompany
      fullName
      companyName
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
export const GET_USER_COMPANY = gql`
  query GetUserCompany {
    getUserCompany {
      benefits
      companyName
      description
      yearOfSetUp
      sizeOfCompany
      localisation
      technologies
    }
  }
`;
export const ALL_USERS_OFFERS = gql`
  query AllUsersOffers {
    allUsersOffers {
      id
      title
    }
  }
`;
