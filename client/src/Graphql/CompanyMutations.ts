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
export const ADD_IMAGE = gql`
  mutation AddImage($id: Float!, $file: Upload!) {
    addImage(id: $id, file: $file)
  }
`;
export const DELETE_IMAGE = gql`
  mutation DeleteImage($id: Float!) {
    deleteImage(id: $id)
  }
`;
