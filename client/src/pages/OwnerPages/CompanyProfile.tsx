import React from 'react';
import Navbars from '../../components/Navbars';
import { useQuery } from '@apollo/client';
import { GET_USER_COMPANY } from '../../Graphql/Queries';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateCompanyLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  text-align: center;
  align-self: center; 
`;
const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: center;
  padding: 2rem;
`;
const CompanyProfile = () => {
  const { data, loading } = useQuery(GET_USER_COMPANY);

  if (loading) return null;
  else
    return (
      <>
        <Navbars />
        <Container>
          {!data && (
            <CreateCompanyLink to="/createCompany">
              You don't have company yet, create it now!
            </CreateCompanyLink>
          )}
          ;
        </Container>
      </>
    );
};

export default CompanyProfile;
