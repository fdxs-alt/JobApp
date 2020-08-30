import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import FilterComponent from '../components/FilterComponents/FilterComponent';
import SearchBar from '../components/FilterComponents/SearchBar';
import FilterResults from '../components/FilterComponents/FilterResults';
const MoreSpecifiedJobOffers = () => {
  return (
    <>
      <Navbars />
      <SearchBar />
      <FilterComponent />
      <FilterResults />
    </>
  );
};

export default MoreSpecifiedJobOffers;
