import React from 'react';
import {
  Header,
  LeftElement,
  MyLink,
  RightElement,
  LeftPanel,
  RightPanel,
} from '../styles/NavbarStyles';
import { useQuery } from '@apollo/client';
import { GET_User } from '../Graphql/Queries';
const Navbar = () => {
  const { data, loading } = useQuery(GET_User, {
    fetchPolicy: 'network-only',
  });
  if (loading) return <h1>loading</h1>;
  else
    return (
      <Header>
        <LeftPanel>
          <LeftElement>
            <MyLink to="/">NO FLUFF JOBS</MyLink>
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
            <MyLink to="/employers">For employer</MyLink>
          </RightElement>
          <RightElement>
            <MyLink to="/">Post a job</MyLink>
          </RightElement>
          <RightElement>
            <MyLink to="/login">Log in</MyLink>
          </RightElement>
          <RightElement>
            <MyLink to="/register">Register</MyLink>
          </RightElement>
        </RightPanel>
      </Header>
    );
};

export default Navbar;
