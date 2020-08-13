import { gql } from '@apollo/client';

export const ADD_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
    }
  }
`;
export const CREATE_NEW_JOB_OFFER = gql`
  mutation CreateNewJobOffer($input: JobOfferInput!) {
    createNewJobOffer(input: $input) {
      id
    }
  }
`;
