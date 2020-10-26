import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { SEARCH_JOB_OFFERS } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import { Container } from '../../styles/MainPageStyles';
import Spinner from '../Spinner';
import JobInfromation from '../sharedComp/JobInformation';
const SearchResult = () => {
  const input = parse(window.location.search).input?.toString();

  const { data, loading, error } = useQuery(SEARCH_JOB_OFFERS, {
    variables: { input },
  });

  if (loading) return <Spinner size={50} loading={loading} small />;

  if (error) return <Redirect to="/" />;

  return (
    <Container>
      {data.searchJobOffers.map((element: any) => (
        <JobInfromation key={element.id} element={element} />
      ))}
    </Container>
  );
};

export default SearchResult;
