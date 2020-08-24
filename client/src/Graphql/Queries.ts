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
      id
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
      date
    }
  }
`;
export const SPECIFIC_JOB_OFFER = gql`
  query SpecificJobOffer($id: Float!) {
    specificJobOffer(id: $id) {
      benefitsInWork
      extraSkills
      mandatory
      maxSalary
      minSalary
      onlineRecrutation
      tasks
      title
    }
  }
`;
export const GET_ALL_JOB_IMAGES = gql`
  query GetAllJobOfferImages($id: Float!) {
    getAllJobOfferImages(id: $id) {
      id
      data
      type
    }
  }
`;
export const GET_INFORMATION = gql`
  query {
    getUser {
      fullName
    }
    getUserCompany {
      benefits
      companyName
      description
      yearOfSetUp
      sizeOfCompany
      localisation
      technologies
    }
    allUsersOffers {
      id
      title
    }
  }
`;
export const GET_ALL_CVS = gql`
  query GetAllCvs {
    getAllCvs {
      id
    }
  }
`;

export const GET_ALL_JOB_OFFERS = gql`
  query AllUsersOffers {
    allUsersOffers {
      benefitsInWork
      extraSkills
      mandatory
      maxSalary
      minSalary
      onlineRecrutation
      tasks
      title
    }
  }
`;
export const GET_COMPANY_LOGO = gql`
  query GetCompanyLogo($id: Float!) {
    getCompanyLogo(id: $id) {
      type
      data
    }
  }
`;
export const GET_ALL_INFO = gql`
  query GetAllInfo($cursor: Float!) {
    getAllInfo(cursor: $cursor) {
      info {
        id
        title
        minSalary
        maxSalary
        onlineRecrutation
        date
        company {
          companyName
          localisation
        }
      }

      hasMore
    }
  }
`;
