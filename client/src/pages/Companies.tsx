import React from 'react';
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
type GetCompaniesCountType = {
  getCompaniesCount: number;
};
const Companies = () => {
  const { data, loading, error } = useQuery<GetCompaniesCountType>(
    GET_COMPANIES_COUNT,
  );
  console.log(data);
  if (loading) return null;
  if (error) return <Redirect to="/" />;
  return (
    <>
      <Navbars />
      <Container>
        <CompanyQuantity>
          All companies: {data!.getCompaniesCount}
        </CompanyQuantity>
        <AllCompanies />
      </Container>
    </>
  );
};

export default Companies;
