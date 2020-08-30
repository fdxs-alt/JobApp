import React from 'react';
import SearchBar from '../components/FilterComponents/SearchBar';
import Navbars from '../components/Navbars/Navbars';
import AllJobOffers from '../components/AllJobOffers';
import FilterComponent from '../components/FilterComponents/FilterComponent';
const MainPage = () => {
  return (
    <>
      <Navbars />
      <SearchBar />
      <FilterComponent />
      <AllJobOffers />
    </>
  );
};

export default MainPage;
