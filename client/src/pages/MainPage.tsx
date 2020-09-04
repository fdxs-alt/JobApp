import React from 'react';
import SearchBar from '../components/FilterComponents/SearchBar';
import AllJobOffers from '../components/AllJobOffers';
import FilterComponent from '../components/FilterComponents/FilterComponent';
const MainPage = () => {
  return (
    <>
      <SearchBar />
      <FilterComponent />
      <AllJobOffers />
    </>
  );
};

export default MainPage;
