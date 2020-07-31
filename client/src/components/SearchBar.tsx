import React from 'react';
import styled from 'styled-components';
import { MyButton } from '../styles/Button';
const Section = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;
const Title = styled.h1`
  color: white;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 0.8rem;
`;
const Container = styled.div`
  width: 40%;
  display: flex;
  padding: 0.5rem;
`;
const SearchInput = styled.input`
  width: 75%;
  padding: 0.8rem;
  font-size: 1.2rem;
`;
const colorsContainer = styled.div``;
const SearchBar = () => {
  return (
    <Section>
      <Title>Top employers. Best IT talents. Transparent salaries.</Title>
      <Container>
        <SearchInput />
        <MyButton width={25}>Search job</MyButton>
      </Container>
    </Section>
  );
};

export default SearchBar;
