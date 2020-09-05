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
      name
      surname
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
      localisation
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
      date
      main
      description
      localisation
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
      joboffer {
        id
        title
        date
      }
      cvs {
        id
        name
        user {
          fullName
        }
      }
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
      main
      description
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
        main
        localisation
        company {
          id
          companyName
        }
      }

      hasMore
    }
  }
`;
export const GET_ALL_SPECIFIC_INFO = gql`
  query getSpecificInfo($id: Float!) {
    getSpecificInfo(id: $id) {
      offer {
        title
        mandatory
        extraSkills
        tasks
        benefitsInWork
        minSalary
        maxSalary
        onlineRecrutation
        description
        main
        localisation
        date
        company {
          companyName
          yearOfSetUp
          sizeOfCompany
          localisation
          description
          technologies
          benefits
        }
      }
      logo {
        type
        data
      }
      images {
        id
        type
        data
      }
    }
  }
`;
export const GET_RANDOM_OFFERS = gql`
  query GetRandomJobOffers {
    getRandomJobOffers {
      id
      title
      onlineRecrutation
      localisation
      company {
        companyName
      }
    }
  }
`;
export const SEARCH_JOB_OFFERS = gql`
  query SearchJobOffers($input: String!) {
    searchJobOffers(input: $input) {
      id
      title
      minSalary
      maxSalary
      main
      date
      localisation
      company {
        companyName
      }
    }
  }
`;
export const FIND_JOB_OFFERS = gql`
  query FindJobOffers($input: findJobOfferInput!) {
    findJobOffers(input: $input) {
      id
      title
      minSalary
      maxSalary
      main
      date
      localisation
      company {
        companyName
      }
    }
  }
`;
export const GET_COMPANIES_COUNT = gql`
  query GetCompaniesCount {
    getCompaniesCount
  }
`;
export const GET_ALL_COMPANIES = gql`
  query GetAllComapanies($cursor: Float!) {
    getAllComapanies(cursor: $cursor) {
      id
      name
      data
      type
      company {
        id
        companyName
        yearOfSetUp
      }
    }
  }
`;
export const GET_SPECIFIC_COMPANY = gql`
  query GetSpecificCompany($id: Float!) {
    getSpecificCompany(id: $id) {
      company {
        benefits
        companyName
        description
        yearOfSetUp
        sizeOfCompany
        localisation
        technologies
      }
      logo {
        data
      }
    }
  }
`;
