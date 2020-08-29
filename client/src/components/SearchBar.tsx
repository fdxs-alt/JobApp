import React, { useState } from 'react';
import {
  Section,
  SearchInput,
  Title,
  Container,
} from '../styles/SearchBarStyles';
import { MyButton } from '../styles/Button';
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
        />
        <MyButton width={25} type="submit">
          Search job
        </MyButton>
      </Container>
    </Section>
  );
};

export default SearchBar;
