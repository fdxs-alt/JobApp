import React from 'react';
import Navbars from '../../components/Navbars';
import { Container, CreateLink } from '../../styles/CompanyProfileStyle';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import SingleJobOffer from '../../components/SingleJobOffer';
import styled from 'styled-components';
export type UserOfferResponseType = {
  id: number;
  title: string;
};
const JobOffersWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
`;
const JobOffers = () => {
  const { data, loading } = useQuery(ALL_USERS_OFFERS);
  console.log(data);
  if (loading) return null;
  if (!data)
    return (
      <>
        <Navbars />
        <Container>
          <CreateLink to="/createCompany">
            You need to create company first!
          </CreateLink>
        </Container>
      </>
    );
  else
    return (
      <>
        <Navbars />
        <Container>
          {data.allUsersOffers.length === 0 ? (
            <CreateLink to="/createJobOffer">
              Create first job offer!
            </CreateLink>
          ) : (
            <JobOffersWrapper>
              {data.allUsersOffers.map((offer: UserOfferResponseType) => (
                <SingleJobOffer
                  key={offer.id}
                  title={offer.title}
                  id={offer.id}
                />
              ))}
            </JobOffersWrapper>
          )}
        </Container>
      </>
    );
};

export default JobOffers;
