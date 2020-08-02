import React, { useState } from 'react';
import {
  Container,
  MyLink,
  Icon,
  LinkContainer,
} from '../styles/LoginPageStyles';
import {
  RegisterContainer,
  ButtonContainer,
  RegisterButton,
  Button,
  Card,
  Header,
  MainContent,
  Logo,
  Time,
  Title,
  Proses,
} from '../styles/Register';

import logo from '../images/logo.png';
import RegisterForm from '../components/Register';
import {
  faArrowCircleLeft,
  faWallet,
  faClock,
  faStar,
  faAd,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {
  const [active, setActive] = useState(true);
  return (
    <Container>
      <Header>
        <Logo src={logo} />
        <LinkContainer>
          <Icon icon={faArrowCircleLeft} />
          <MyLink to="/">Go back</MyLink>
        </LinkContainer>
      </Header>
      <MainContent>
        <RegisterContainer>
          <ButtonContainer>
            <Button onClick={() => setActive(false)} active={active}>
              Log in
            </Button>
            <RegisterButton onClick={() => setActive(true)} active={active}>
              Register
            </RegisterButton>
          </ButtonContainer>
          <RegisterForm active={active} />
        </RegisterContainer>

        <Proses>
          <Card>
            <FontAwesomeIcon
              icon={faCodeBranch}
              style={{
                fontSize: '2rem',
                marginBottom: '10px',
                color: 'lightblue',
              }}
            />
            <Title>Get the exposure</Title>2 500 000 monthly page views 48000
            Facebook Fans 700 000 monthly users on nofluffjobs.com & social
            media
          </Card>
          <Card>
            <FontAwesomeIcon
              icon={faWallet}
              style={{
                fontSize: '2rem',
                marginBottom: '10px',
                color: 'darkgreen',
              }}
            />
            <Title>Transparent Recruitment</Title>
            Follow the new IT recruitment standards. Only at No Fluff Jobs, all
            job ads have salary ranges.
          </Card>
          <Card>
            <FontAwesomeIcon
              icon={faStar}
              style={{
                fontSize: '2rem',
                marginBottom: '10px',
                color: 'purple',
              }}
            />
            <Title>Reach top IT talents</Title>
            We are the biggest and the most effective job board with
            international reach
          </Card>
          <Card>
            <FontAwesomeIcon
              icon={faAd}
              style={{
                fontSize: '2rem',
                marginBottom: '10px',
                color: 'orange',
              }}
            />
            <Title> Clear job ad structure</Title>
            All our job ads have a standardized and comparable ad structure. IT
            guys love it.
          </Card>
          <Time>
            <Icon icon={faClock} /> It won’t take you more than 15 minutes to
            post the ad!
          </Time>
        </Proses>
      </MainContent>
    </Container>
  );
};

export default Register;
