import React from 'react';
import {
  Header,
  LeftElement,
  MyLink,
  RightElement,
  LeftPanel,
  RightPanel,
  Logout,
} from '../styles/NavbarStyles';
import { useQuery, useMutation } from '@apollo/client';
import { GET_User } from '../Graphql/Queries';
import { LOGOUT } from '../Graphql/AuthMutations';
import { setToken } from '../AccessToken';
import isAuthenticated from '../Graphql/isAuth';
import { useHistory } from 'react-router-dom';
const Navbar = () => {
  const history = useHistory();

  const { data, loading } = useQuery(GET_User, {
    fetchPolicy: 'network-only',
  });
  const [logout, { client }] = useMutation(LOGOUT);

  if (loading) return null;
  else
    return (
      <Header>
        <LeftPanel>
          <LeftElement>
            <MyLink to="/">LOGO</MyLink>
          </LeftElement>
          <LeftElement>
            <MyLink to="/jobs">Offers</MyLink>
          </LeftElement>
          <LeftElement>
            <MyLink to="/">Profiles</MyLink>
          </LeftElement>
          <LeftElement>
            <MyLink to="/">Masterclazz</MyLink>
          </LeftElement>
        </LeftPanel>
        <RightPanel>
          <RightElement>
            {data?.getUser.hasCompany ? (
              <MyLink to="/employers">For employer</MyLink>
            ) : data ? (
              <MyLink to="/">Apply for a job</MyLink>
            ) : (
              <MyLink to="/login">Log in</MyLink>
            )}
          </RightElement>
          <RightElement>
            <MyLink to="/">Post a job</MyLink>
          </RightElement>
          <RightElement>
            {data ? (
              <>{data.getUser.fullName}</>
            ) : (
              <MyLink to="/login">Log in</MyLink>
            )}
          </RightElement>
          <RightElement>
            {data ? (
              <Logout
                onClick={async () => {
                  await logout();
                  isAuthenticated(false);
                  setToken('');
                  isAuthenticated(false);
                  client.clearStore();
                  history.push('/login');
                }}
              >
                LOGOUT
              </Logout>
            ) : (
              <MyLink to="/register">Register</MyLink>
            )}
          </RightElement>
        </RightPanel>
      </Header>
    );
};

export default Navbar;
