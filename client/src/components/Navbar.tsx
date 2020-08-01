import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Header = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  width: 100%;
  display: flex;
  align-content: space-around;
  color: white;
  background-color: ${(props) => props.theme.colors.dark};
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
`;
const LeftPanel = styled.ul`
  list-style-type: none;
  width: 45%;
  display: flex;
  align-items: center;
`;

const RightPanel = styled.ul`
  list-style-type: none;
  width: 45%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LeftElement = styled.li`
  border-bottom: 4px solid ${(props) => props.theme.colors.dark};
  width: 20%;

  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};

  padding: 1.8rem 1rem;
  text-align: center;
  text-transform: uppercase;
  &:hover {
    border-bottom: 4px solid ${(props) => props.theme.colors.button};
  }
`;
const RightElement = styled.li`
  border-bottom: 4px solid ${(props) => props.theme.colors.dark};
  width: 20%;

  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1.8rem 1rem;
  text-align: center;
  text-transform: uppercase;
  &:first-child {
    border-left: 1px solid ${(props) => props.theme.colors.lightBorder};
  }
  &:last-child {
    border-right: none;
  }
  &:hover {
    border-bottom: 4px solid ${(props) => props.theme.colors.button};
  }
`;
const MyLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
const Navbar = () => {
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
