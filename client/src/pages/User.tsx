import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../Graphql/Queries';
import Spinner from '../components/Spinner';
import { GetUserResponse } from '../components/Navbars/Navbars';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
// import { useMutation } from '@apollo/client';
// import { DELETE_ACCOUNT } from '../Graphql/AuthMutations';
const Container = styled.div`
  min-height: inherit;
  width: 70%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  grid-template-rows: 0.6fr 1fr 0.2fr;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;
const InfoSectiontitle = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  font-weight: 500;
  text-align: center;
  font-size: 1.2em;
`;
const UserInfoContainer = styled.section`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UserInfo = styled.p`
  font-size: 1.2em;
  padding: 0.4rem;
`;
const User = () => {
  const { data, loading, error } = useQuery<GetUserResponse>(GET_USER);

  if (loading) return <Spinner loading={loading} small size={50} />;
  if (error) return <Redirect to="/" />;
  return (
    <Container>
      <InfoSectiontitle>User info:</InfoSectiontitle>
      <UserInfoContainer>
        <UserInfo>
          <b>Name:</b> {data?.getUser.name}
        </UserInfo>
        <UserInfo>
          <b>Surname:</b> {data?.getUser.surname}
        </UserInfo>
        <UserInfo>
          <b>Email:</b> {data?.getUser.email}
        </UserInfo>
      </UserInfoContainer>
      <InfoSectiontitle>Change password</InfoSectiontitle>
      <ChangePassword />

      <InfoSectiontitle>Delete account</InfoSectiontitle>
    </Container>
  );
};

export default User;
