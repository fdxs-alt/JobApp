import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';

const SearchPage = () => {
  return (
    <>
      <Navbars />
      <SearchBar />
      <SearchResult />
    </>
  );
};

export default SearchPage;
