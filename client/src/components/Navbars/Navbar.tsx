import React, { useState } from 'react';
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
import {
  faPowerOff,
  faSignInAlt,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { LaptopHeader, LaptopLink } from '../../styles/SmallNavbarStyles';
type Props = {
  fullName?: string | undefined;
  handleClick: () => void;
  smallMenu: boolean;
};

const Navbar: React.FC<Props> = ({ fullName, handleClick, smallMenu }) => {
  const [open, setOpen] = useState(false);

  if (smallMenu)
    return (
      <LaptopHeader opened={open}>
        {open ? (
          <>
            <FontAwesomeIcon
              icon={faTimes}
              style={{
                fontSize: '2rem',
                alignSelf: 'flex-end',
                outline: 'none',
              }}
              onClick={() => setOpen(false)}
              onKeyPress={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter') setOpen(false);
              }}
              tabIndex={0}
            />

            <LaptopLink to="/jobs">Offers</LaptopLink>

            <LaptopLink to="/companies">Companies</LaptopLink>

            <LaptopLink to="/">Masterclazz</LaptopLink>

            {fullName ? (
              <LaptopLink to="/">Apply for a job</LaptopLink>
            ) : (
              <LaptopLink to="/employers">For Employers</LaptopLink>
            )}

            {fullName ? (
              <LaptopLink to="/user">{fullName}</LaptopLink>
            ) : (
              <LaptopLink to="/login">
                Login {'    '}
                <FontAwesomeIcon
                  icon={faSignInAlt}
                  style={{ fontSize: '1.4rem' }}
                />
              </LaptopLink>
            )}

            {fullName ? (
              <Logout onClick={handleClick}>
                <FontAwesomeIcon
                  icon={faPowerOff}
                  style={{ fontSize: '1.4rem', marginTop: '1rem' }}
                />
              </Logout>
            ) : (
              <LaptopLink to="/register">Register</LaptopLink>
            )}
          </>
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: '2rem', outline: 'none' }}
            onClick={() => setOpen(true)}
            tabIndex={0}
            onKeyPress={(e: React.KeyboardEvent) => {
              if (e.key === 'Enter') setOpen(true);
            }}
          />
        )}
      </LaptopHeader>
    );
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
            <MyLink to="/companies">Companies</MyLink>
          </LeftElement>
          <LeftElement>
            <MyLink to="/">Masterclazz</MyLink>
          </LeftElement>
        </LeftPanel>
        <RightPanel>
          <RightElement>
            <MyLink to="/employers">For Employers</MyLink>
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
