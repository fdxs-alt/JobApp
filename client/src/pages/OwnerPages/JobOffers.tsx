import React from 'react';
import Navbars from '../../components/Navbars';
import { Container, CreateCompanyLink } from '../../styles/CompanyProfileStyle';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';

const JobOffers = () => {
  const { data, loading } = useQuery(ALL_USERS_OFFERS);
  if (loading) return null;
  else if (!data)
    return (
      <>
        <Navbars />
        <Container>
          <CreateCompanyLink to="/createJobOffer">
            You don't have any job offer yet, create it now!
          </CreateCompanyLink>
        </Container>
      </>
    );
  else
    return (
      <>
        <Navbars />
      </>
    );
};

export default JobOffers;
