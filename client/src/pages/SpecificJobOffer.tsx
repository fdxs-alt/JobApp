import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_SPECIFIC_INFO } from '../Graphql/Queries';
const SpecificJobOffer = () => {
  const id = parseInt((parse(window.location.search) as any).id);
  const { data, loading, error } = useQuery(GET_ALL_SPECIFIC_INFO, {
    variables: { id },
  });
  console.log(data);
  if (loading) return null;
  else if (error) return <Redirect to="/" />;
  return (
    <>
      <Navbars />
    </>
  );
};

export default SpecificJobOffer;
