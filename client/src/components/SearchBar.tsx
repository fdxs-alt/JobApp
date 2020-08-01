import React from 'react';
import {
  Section,
  SearchInput,
  Title,
  Container,
} from '../styles/SearchBarStyles';
import { MyButton } from '../styles/Button';

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
