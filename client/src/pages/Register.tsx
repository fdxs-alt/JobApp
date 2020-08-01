import React from 'react';
import {
  Container,
  InputLabel,
  Input,
  MyLink,
  Icon,
  LinkContainer,
} from '../styles/LoginPageStyles';
import styled from 'styled-components';
import logo from '../images/logo.png';
import {
  faArrowCircleLeft,
  faWallet,
  faClock,
  faStar,
  faAd,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Header = styled.header`
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkish};
  display: flex;
  align-items: center;
`;
const Logo = styled.img`
  max-width: 100px;
  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
`;
const MainContent = styled.main`
  display: grid;
  width: 80%;
  background-color: inherit;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: 2rem auto;
`;
const Proses = styled.section`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 0.75fr 0.25fr;
  color: ${(props) => props.theme.colors.fontColor};
`;
const Time = styled.div`
  background-color: white;
  grid-column: 1/3;
  padding: 2rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
`;
const Card = styled.div`
  padding: 4.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-align: center;
  background-color: white;
  word-break: keep-all;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1.5rem;
`;
const Title = styled.h4`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.5rem;
`;
const Register = () => {
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
        <span>d</span>
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
