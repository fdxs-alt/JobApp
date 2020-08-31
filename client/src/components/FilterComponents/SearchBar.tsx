import React, { useState } from 'react';
import {
  Section,
  SearchInput,
  Title,
  Container,
  Button,
} from '../../styles/SearchBarStyles';
import { useHistory } from 'react-router-dom';
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');
  const history = useHistory();
  return (
    <Section
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        history.push(`/searchjob?input=${searchValue}`);
        setSearchValue('');
      }}
    >
      <Title>Top employers. Best IT talents. Transparent salaries.</Title>
      <Container>
        <SearchInput
          name="search"
          type="text"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          required
          placeholder="What are you looking for?"
        />
        <Button type="submit">Search job</Button>
      </Container>
    </Section>
  );
};

export default SearchBar;
