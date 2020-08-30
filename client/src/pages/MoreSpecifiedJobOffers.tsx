import React from 'react';
import { parse } from 'query-string';
import Navbars from '../components/Navbars/Navbars';
import FilterComponent from '../components/FilterComponent';
import SearchBar from '../components/SearchBar';
const MoreSpecifiedJobOffers = () => {
  const data = parse(window.location.search);
  return (
    <>
      <Navbars />
      <SearchBar />
      <FilterComponent />
    </>
  );
};

export default MoreSpecifiedJobOffers;
