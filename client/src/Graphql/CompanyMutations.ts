import { gql } from '@apollo/client';

export const ADD_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
    }
  }
`;
