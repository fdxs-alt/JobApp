import React, { useState } from 'react';
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
import {
  faUserAlt,
  faPowerOff,
  faTimes,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import { LaptopHeader, LaptopLink } from '../../styles/SmallNavbarStyles';

type Props = {
  handleClick: () => void;
  smallMenu: boolean;
};

const EmployerNavbar: React.FC<Props> = ({ handleClick, smallMenu }) => {
  const [open, setOpen] = useState(false);
  if (smallMenu)
    return (
      <LaptopHeader opened={open}>
        {open ? (
          <>
            <FontAwesomeIcon
              icon={faTimes}
              style={{ fontSize: '2rem', alignSelf: 'flex-end' }}
              onClick={() => setOpen(false)}
            />

            <LaptopLink to="/dashboard">Dashboard</LaptopLink>

            <LaptopLink to="/joboffers">Offers</LaptopLink>

            <LaptopLink to="/application">Application</LaptopLink>
            
            <LaptopLink to="/profile">Company</LaptopLink>

            <LaptopLink to="/createJobOffer">Create</LaptopLink>

            <LaptopLink to="/user">Options</LaptopLink>

            <Logout onClick={handleClick} style={{ marginTop: '1.5rem' }}>
              <FontAwesomeIcon
                icon={faPowerOff}
                style={{ fontSize: '1.4rem' }}
              />
            </Logout>
          </>
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            style={{ fontSize: '2rem' }}
            onClick={() => setOpen(true)}
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
              <FontAwesomeIcon
                icon={faUserAlt}
                style={{ fontSize: '1.4rem' }}
              />
            </MyLink>
          </RightElement>
          <RightElement>
            <Logout onClick={handleClick}>
              <FontAwesomeIcon
                icon={faPowerOff}
                style={{ fontSize: '1.4rem' }}
              />
            </Logout>
          </RightElement>
        </RightPanel>
      </Header>
    );
};

export default EmployerNavbar;
