import React from 'react';
import { FIND_JOB_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import Spinner from '../Spinner';
import { Container } from '../../styles/MainPageStyles';
import JobInfromation from '../sharedComp/JobInformation';
const FilterResults = () => {
  const searchParams: {
    main: string;
    localisation: string;
    minSalary: string;
    title: string;
  } = useParams();

  const input = {
    main: searchParams.main,
    localisation: searchParams.localisation,
    minSalary: parseInt(searchParams.minSalary),
    title: searchParams.title,
  };

  const { data, loading, error } = useQuery(FIND_JOB_OFFERS, {
    variables: { input },
  });

  if (loading) return <Spinner small size={50} loading={loading} />;

  if (error) return <Redirect to="/" />;
  return (
    <Container>
      {data.findJobOffers.map((element: any) => (
        <JobInfromation key={element.id} element={element} />
      ))}
    </Container>
  );
};

export default FilterResults;
