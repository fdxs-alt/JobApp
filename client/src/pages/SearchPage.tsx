import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import SearchBar from '../components/FilterComponents/SearchBar';
import SearchResult from '../components/FilterComponents/SearchResult';

const SearchPage = () => {
  return (
    <>
      <SearchBar />
      <SearchResult />
    </>
  );
};

export default SearchPage;
