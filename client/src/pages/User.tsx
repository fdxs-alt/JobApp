import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../Graphql/Queries';
import Spinner from '../components/Spinner';
import { GetUserResponse } from '../components/Navbars/Navbars';
import { Redirect } from 'react-router-dom';
import ChangePassword from '../components/ChangePassword';
import DeleteAccount from '../components/DeleteAccount';
import {
  Wrapper,
  InfoSectiontitle,
  UserInfoContainer,
  UserInfo,
} from '../styles/UserPageStyles';

const User = () => {
  const { data, loading, error } = useQuery<GetUserResponse>(GET_USER);
  if (loading) return <Spinner loading={loading} small size={50} />;
  if (error) return <Redirect to="/" />;
  return (
    <Wrapper>
      <InfoSectiontitle>User info:</InfoSectiontitle>
      <UserInfoContainer>
        <UserInfo>
          <b>Name:</b> {data.getUser.name}
        </UserInfo>
        <UserInfo>
          <b>Surname:</b> {data.getUser.surname}
        </UserInfo>
        <UserInfo>
          <b>Email:</b> {data.getUser.email}
        </UserInfo>
      </UserInfoContainer>
      <InfoSectiontitle>Change password</InfoSectiontitle>
      <ChangePassword />

      <DeleteAccount />
    </Wrapper>
  );
};

export default User;
