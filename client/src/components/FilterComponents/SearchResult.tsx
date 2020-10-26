import React from 'react';
import { useQuery } from '@apollo/client';
import { SEARCH_JOB_OFFERS } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import { Container } from '../../styles/MainPageStyles';
import Spinner from '../Spinner';
import JobInfromation from '../sharedComp/JobInformation';
import { useParams } from 'react-router-dom';
const SearchResult = () => {
  const params: { input: string } = useParams();
  const { data, loading, error } = useQuery(SEARCH_JOB_OFFERS, {
    variables: { input: params.input },
  });

  if (loading) return <Spinner size={50} loading={loading} small />;

  if (error) return <Redirect to="/" />;

  return (
    <Container>
      {data &&
        data.searchJobOffers.map((element: any) => (
          <JobInfromation key={element.id} element={element} />
        ))}
    </Container>
  );
};

export default SearchResult;
