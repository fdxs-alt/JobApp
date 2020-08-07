import React from 'react';
import {
  LeftPanel,
  Header,
  MyLink,
  LeftElement,
  RightElement,
  RightPanel,
  Logout,
} from '../styles/NavbarStyles';
type Props = {
  handleClick: () => void;
};
const EmployerNavbar: React.FC<Props> = ({ handleClick }) => {
  return (
    <Header>
      <LeftPanel>
        <LeftElement>
          <MyLink to="/">LOGO</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/dashboard">Dashboard</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/offers">Offers</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/application">Application</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/profile">Company</MyLink>
        </LeftElement>
      </LeftPanel>
      <RightPanel>
        <RightElement>
          <Logout onClick={handleClick}>LOGOUT</Logout>
        </RightElement>
      </RightPanel>
    </Header>
  );
};

export default EmployerNavbar;
