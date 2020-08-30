import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import SearchBar from '../components/FilterComponents/SearchBar';
import SearchResult from '../components/FilterComponents/SearchResult';

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
