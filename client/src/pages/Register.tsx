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
  Header,
  MainContent,
  Logo,
} from '../styles/Register';
import logo from '../images/logo.png';
import RegisterForm from '../components/Register';
import Login from '../components/Login';
import Pros from '../components/Proses';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
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
        <RegisterContainer active={active}>
          <ButtonContainer>
            <Button onClick={() => setActive(false)} active={active}>
              Log in
            </Button>
            <RegisterButton onClick={() => setActive(true)} active={active}>
              Register
            </RegisterButton>
          </ButtonContainer>
          <RegisterForm active={active} />
          <Login active={active} />
        </RegisterContainer>
        <Pros />
      </MainContent>
    </Container>
  );
};

export default Register;
