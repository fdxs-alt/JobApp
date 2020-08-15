import React from 'react';
import Navbars from '../../components/Navbars';
import { Container, CreateCompanyLink } from '../../styles/CompanyProfileStyle';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';

const JobOffers = () => {
  const { data, loading } = useQuery(ALL_USERS_OFFERS);

  if (loading) return null;
  console.log(data);
  if (!data)
    return (
      <>
        <Navbars />
        <Container>
          <CreateCompanyLink to="/createCompany">
            You need to create company first!
          </CreateCompanyLink>
        </Container>
      </>
    );
  else
    return data.allUsersOffers.length === 0 ? (
      <>
        <Navbars />
        <Container>
          <CreateCompanyLink to="/createJobOffer">
            Create your first job offer!
          </CreateCompanyLink>
        </Container>
      </>
    ) : (
      <>
        <Navbars />
      </>
    );
};

export default JobOffers;
