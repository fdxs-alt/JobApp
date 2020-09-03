import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { SEARCH_JOB_OFFERS } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import {
  JobInfromation,
  Column,
  LightInfo,
  ColumWithSalary,
  Salary,
  Container,
  Title,
} from '../../styles/MainPageStyles';
import Spinner from '../Spinner';
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

export default SearchResult;
