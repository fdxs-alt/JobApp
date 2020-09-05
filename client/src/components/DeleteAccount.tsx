import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_ACCOUNT, LOGOUT } from '../Graphql/AuthMutations';
import { useHistory } from 'react-router-dom';
import { ButtonContainer, DeleteButton } from '../styles/UserPageStyles';

const DeleteAccount = () => {
  const [deleteAccount] = useMutation(DELETE_ACCOUNT);
  const [logout] = useMutation(LOGOUT);
  const history = useHistory();
  return (
    <ButtonContainer>
      <DeleteButton
        type="button"
        onClick={async () => {
          try {
            await deleteAccount();
            await logout();
            history.push('/');
          } catch (error) {
            return;
          }
        }}
      >
        Delete account
      </DeleteButton>
    </ButtonContainer>
  );
};

export default DeleteAccount;
