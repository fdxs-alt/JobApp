import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { useQuery } from '@apollo/client';
import { GET_ALL_CVS } from '../../Graphql/Queries';
const CompanyApplications = () => {
  const { data, loading, error } = useQuery(GET_ALL_CVS);
  if (loading) return null;
  return (
    <>
      <Navbars />
      {data.getAllCvs.length === 0 && (
        <h1 style={{ textAlign: 'center' }}>You have got no feedback</h1>
      )}
    </>
  );
};

export default CompanyApplications;
