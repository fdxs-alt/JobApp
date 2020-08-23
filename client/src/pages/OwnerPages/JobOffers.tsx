import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { Container, CreateLink } from '../../styles/CompanyProfileStyle';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import SingleJobOffer from '../../components/JobOffer/SingleJobOffer';
import { JobOffersWrapper } from '../../styles/JobOffersStyles';
export type UserOfferResponseType = {
  id: number;
  title: string;
};

const JobOffers = () => {
  const { data, loading } = useQuery(ALL_USERS_OFFERS);

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
