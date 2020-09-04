import React from 'react';
import FilterComponent from '../components/FilterComponents/FilterComponent';
import SearchBar from '../components/FilterComponents/SearchBar';
import FilterResults from '../components/FilterComponents/FilterResults';
const MoreSpecifiedJobOffers = () => {
  return (
    <>
      <SearchBar />
      <FilterComponent />
      <FilterResults />
    </>
  );
};

export default MoreSpecifiedJobOffers;
