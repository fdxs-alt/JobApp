import React, { useState } from 'react';
import Navbars from '../components/Navbars/Navbars';
import AllCompanies from '../components/AllCompanies';
import { GET_COMPANIES_COUNT } from '../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  CompanyQuantity,
  PaginationButtonsContainer,
  Container,
  Button,
} from '../styles/CompanyPageStyles';
import Spinner from '../components/Spinner';

type GetCompaniesCountType = {
  getCompaniesCount: number;
};

const Companies = () => {
  const { data, loading, error } = useQuery<GetCompaniesCountType>(
    GET_COMPANIES_COUNT,
  );
  const [page, setPage] = useState(0);

  if (loading) return <Spinner size={50} loading={loading} small />;
  if (error) return <Redirect to="/" />;

  const onClick = (cursor: number) => {
    setPage(cursor);
  };

  return (
    <>
      <Container>
        <CompanyQuantity>
          All companies: {data!.getCompaniesCount}
        </CompanyQuantity>
        <AllCompanies cursor={page} />
        <PaginationButtonsContainer>
          {[...Array(Math.ceil(data!.getCompaniesCount / 24))].map(
            (_, index: number) => (
              <Button onClick={() => onClick(index * 24)} key={index}>
                {index + 1}
              </Button>
            ),
          )}
        </PaginationButtonsContainer>
      </Container>
    </>
  );
};

export default Companies;
