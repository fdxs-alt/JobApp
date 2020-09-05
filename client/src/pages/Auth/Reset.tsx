import React from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { Container } from '../../styles/AuthStyles';
import { RESET } from '../../Graphql/CompanyMutations';
import { parse } from 'query-string';
import { Redirect } from 'react-router-dom';
import { InputLabel, Input } from '../../styles/LoginPageStyles';
import Joi from '@hapi/joi';
import { joiResolver } from '@hookform/resolvers';
import { Error } from '../../styles/LoginPageStyles';
import SearchBar from '../../components/FilterComponents/SearchBar';
import { ToastContainer } from 'react-toastify';
import { CustomToast } from '../../utils/CustomToast';
import { setToken } from '../../AccessToken';
import isAuthenticated, { isOwner } from '../../Graphql/isAuth';
import { GET_USER } from '../../Graphql/Queries';
type ResetInputType = {
  password: string;
  confirmPassword: string;
};
const InputWrapper = styled.form`
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ChangePasswordTitle = styled.p`
  font-size: 1.4rem;
  padding: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkish};
`;
const Button = styled.button`
  padding: 0.8rem 0.4rem;
  color: white;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  font-size: 1.2rem;
`;
const schema = Joi.object({
  password: Joi.string().required().min(8),
  confirmPassword: Joi.string().required().min(8),
});
const Reset = () => {
  const token = parse(window.location.search).token;

  const { handleSubmit, register, errors } = useForm<ResetInputType>({
    resolver: joiResolver(schema),
  });

  const [resetPassword] = useMutation(RESET, {
    update: (store, { data, errors }) => {
      if (errors) return CustomToast('Error occured', 'error');
      store.writeQuery({
        query: GET_USER,
        data: {
          getUser: {
            ...data.reset.user,
          },
        },
      });
      setToken(data.reset.accessToken);
      isAuthenticated(true);
      if (data.reset.user.hasCompany) isOwner(true);
    },
  });

  const handleFormSubmit = async ({
    confirmPassword,
    password,
  }: ResetInputType) => {
    if (password !== confirmPassword) {
      CustomToast('Passwords must be identical', 'error');
      return;
    }

    const data = {
      token: token as string,
      confirmPassword,
      password,
    };
    try {
      await resetPassword({
        variables: { data },
      });
    } catch (error) {
      CustomToast(error, 'success');
    }
  };
  if (!token) return <Redirect to="/" />;
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ width: '30%' }}
      />
      <SearchBar />
      <Container>
        <InputWrapper onSubmit={handleSubmit(handleFormSubmit)}>
          <ChangePasswordTitle>Change password</ChangePasswordTitle>
          <InputLabel>Password</InputLabel>
          <Input type="password" name="password" ref={register} />
          {errors.password?.type === 'string.empty' && (
            <Error>Password field cannot be empty</Error>
          )}
          {errors.password?.type === 'string.min' && (
            <Error>Password field must be at least 8 characters</Error>
          )}
          <InputLabel>Confirm password</InputLabel>
          <Input type="password" name="confirmPassword" ref={register} />
          {errors.confirmPassword?.type === 'string.empty' && (
            <Error>Password field cannot be empty</Error>
          )}
          {errors.confirmPassword?.type === 'string.min' && (
            <Error>Password field must be at least 8 characters</Error>
          )}
          <Button type="submit">Change password</Button>
        </InputWrapper>
      </Container>
    </>
  );
};

export default Reset;
