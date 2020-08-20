import React from 'react';
import SearchBar from '../components/SearchBar';
import Navbars from '../components/Navbars/Navbars';
import AllCompanies from '../components/AllCompanies';
const MainPage = () => {
  return (
    <>
      <Navbars />
      <SearchBar />
      <AllCompanies />
    </>
  );
};

export default MainPage;
