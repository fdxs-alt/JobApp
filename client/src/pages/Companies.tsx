import React, { useState } from 'react';
import Navbars from '../components/Navbars/Navbars';
import AllCompanies from '../components/AllCompanies';
import styled from 'styled-components';
import { GET_COMPANIES_COUNT } from '../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
const Container = styled.div`
  width: 75%;
  margin: 2.5rem auto;
`;
const CompanyQuantity = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  font-size: 2rem;
  font-weight: 500;
  padding: 0.4rem;
  margin-bottom: 0.6rem;
`;
const Button = styled.button`
  padding: 0.4rem 0.6rem;
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.lighterBorder};
  color: ${(props) => props.theme.colors.secondaryFont};
`;
const PaginationButtonsContainer = styled.div`
  width: 100%;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
type GetCompaniesCountType = {
  getCompaniesCount: number;
};

const Companies = () => {
  const { data, loading, error } = useQuery<GetCompaniesCountType>(
    GET_COMPANIES_COUNT,
  );
  const [page, setPage] = useState(0);

  if (loading) return null;
  if (error) return <Redirect to="/" />;

  const onClick = (cursor: number) => {
    setPage(cursor);
  };

  return (
    <>
      <Navbars />
      <Container>
        <CompanyQuantity>
          All companies: {data!.getCompaniesCount}
        </CompanyQuantity>
        <AllCompanies cursor={page} />
        <PaginationButtonsContainer>
          {[...Array(Math.round(data!.getCompaniesCount / 24) + 1)].map(
            (_, index: number) => (
              <Button onClick={() => onClick(index * 24)}>{index + 1}</Button>
            ),
          )}
        </PaginationButtonsContainer>
      </Container>
    </>
  );
};

export default Companies;
