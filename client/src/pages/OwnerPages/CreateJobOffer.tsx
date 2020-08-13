import React from 'react';
import Navbars from '../../components/Navbars';
import {
  Container,
  Wrapper,
  Column,
  Input,
} from '../../styles/CreateCompanyStyles';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
const CreateJobOffer = () => {
  return (
    <>
      <Navbars />

      <Wrapper>
        <Container>
          <Column></Column>
          <Column></Column>
        </Container>
      </Wrapper>
    </>
  );
};

export default CreateJobOffer;
