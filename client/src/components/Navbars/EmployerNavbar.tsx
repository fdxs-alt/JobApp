import React from 'react';
import {
  LeftPanel,
  Header,
  MyLink,
  LeftElement,
  RightElement,
  RightPanel,
  Logout,
} from '../../styles/NavbarStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';

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
          <MyLink to="/joboffers">Offers</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/application">Application</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/profile">Company</MyLink>
        </LeftElement>
        <LeftElement>
          <MyLink to="/createJobOffer">Create</MyLink>
        </LeftElement>
      </LeftPanel>
      <RightPanel>
        <RightElement>
          <MyLink to="/user">
            <FontAwesomeIcon icon={faUserAlt} style={{ fontSize: '1.4rem' }} />
          </MyLink>
        </RightElement>
        <RightElement>
          <Logout onClick={handleClick}>
            <FontAwesomeIcon icon={faPowerOff} style={{ fontSize: '1.4rem' }} />
          </Logout>
        </RightElement>
      </RightPanel>
    </Header>
  );
};

export default EmployerNavbar;
