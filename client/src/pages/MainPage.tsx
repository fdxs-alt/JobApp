import React from 'react';
import SearchBar from '../components/SearchBar';
import Navbars from '../components/Navbars/Navbars';
import AllJobOffers from '../components/AllCompanies';
const MainPage = () => {
  return (
    <>
      <Navbars />
      <SearchBar />
      <AllJobOffers />
    </>
  );
};

export default MainPage;
