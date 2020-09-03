import React from 'react';
import { parse } from 'query-string';
import { FIND_JOB_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import {
  JobInfromation,
  Container,
  Column,
  Title,
  LightInfo,
  ColumWithSalary,
  Salary,
} from '../../styles/MainPageStyles';
import Spinner from '../Spinner';

const FilterResults = () => {
  const searchParams = parse(window.location.search);
  const input = {
    main: searchParams.main,
    localisation: searchParams.localisation,
    minSalary: parseInt(searchParams.minSalary as any),
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
        <JobInfromation key={element.id}>
          <Column>
            <Title to={`/specific?id=${element.id}`}>{element.title}</Title>
            <LightInfo>in {element.company.companyName}</LightInfo>
            <LightInfo> {element.date}</LightInfo>
          </Column>

          <ColumWithSalary>
            <Salary>
              {element.minSalary + ' - ' + element.maxSalary + ' PLN'}
            </Salary>
            <Salary>{element.main}</Salary>
            <LightInfo>{element.localisation}</LightInfo>
          </ColumWithSalary>
        </JobInfromation>
      ))}
    </Container>
  );
};

export default FilterResults;
