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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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
          <MyLink to="/companies">Companies</MyLink>
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
          <MyLink to="/createJobOffer">Post a job</MyLink>
        </RightElement>
        <RightElement>
          {fullName ? (
            <>{fullName}</>
          ) : (
            <MyLink to="/login">
              Login {'    '}
              <FontAwesomeIcon
                icon={faSignInAlt}
                style={{ fontSize: '1.4rem' }}
              />
            </MyLink>
          )}
        </RightElement>
        <RightElement>
          {fullName ? (
            <Logout onClick={handleClick}>
              {' '}
              <FontAwesomeIcon
                icon={faPowerOff}
                style={{ fontSize: '1.4rem' }}
              />
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
