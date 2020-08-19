import React from 'react';
import {
  Header,
  LeftElement,
  MyLink,
  RightElement,
  LeftPanel,
  RightPanel,
  Logout,
} from '../../styles/NavbarStyles';

type Props = {
  fullName?: string | undefined;
  handleClick: () => void;
};
const Navbar: React.FC<Props> = ({ fullName, handleClick }) => {
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
          {fullName ? (
            <MyLink to="/">Apply for a job</MyLink>
          ) : (
            <MyLink to="/employers">For Employers</MyLink>
          )}
        </RightElement>
        <RightElement>
          <MyLink to="/">Post a job</MyLink>
        </RightElement>
        <RightElement>
          {fullName ? <>{fullName}</> : <MyLink to="/login">Log in</MyLink>}
        </RightElement>
        <RightElement>
          {fullName ? (
            <Logout onClick={handleClick}>LOGOUT</Logout>
          ) : (
            <MyLink to="/register">Register</MyLink>
          )}
        </RightElement>
      </RightPanel>
    </Header>
  );
};

export default Navbar;
