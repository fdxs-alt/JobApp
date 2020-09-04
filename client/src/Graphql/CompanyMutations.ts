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
export const ADD_LOGO = gql`
  mutation AddLogo($id: Float!, $file: Upload!) {
    addLogo(id: $id, file: $file)
  }
`;
export const DELETE_LOGO = gql`
  mutation DeleteLogo($id: Float!) {
    deleteLogo(id: $id)
  }
`;
export const DELETE_JOB_OFFER = gql`
  mutation DeleteJobOffer($id: Float!) {
    deleteJobOffer(id: $id)
  }
`;
export const ADD_CV = gql`
  mutation AddCv($id: Float!, $file: Upload!) {
    addCv(id: $id, file: $file)
  }
`;
export const DELETE_CV = gql`
  mutation DeleteCv($id: Float!, $jobId: Float!) {
    deleteCv(id: $id, jobId: $jobId)
  }
`;
export const RESET = gql`
  mutation Reset($data: ResetPasswordInput!) {
    reset(data: $data) {
      accessToken
      user {
        id
        email
        confirmed
        hasCompany
        fullName
        companyName
      }
    }
  }
`;
