import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input)
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        hasCompany
      }
      accessToken
    }
  }
`;
export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
export const CONFIRM = gql`
  mutation Confirm($token: String!) {
    confirm(token: $token)
  }
`;
export const RESET_BY_EMAIL = gql`
  mutation ResetEmail($email: String!) {
    resetEmail(email: $email)
  }
`;
export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($data: ChangePasswordInput!) {
    changePassword(data: $data)
  }
`;
export const DELETE_ACCOUNT = gql`
  mutation DeleteAccount {
    deleteAccount
  }
`;
