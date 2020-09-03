import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { Container, CreateLink } from '../../styles/CompanyProfileStyle';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import SingleJobOffer from '../../components/JobOffer/SingleJobOffer';
import { JobOffersWrapper } from '../../styles/JobOffersStyles';
import Spinner from '../../components/Spinner';
export type UserOfferResponseType = {
  id: number;
  title: string;
  date: string;
  localisation: string;
};
type Response = {
  allUsersOffers: UserOfferResponseType[];
};
const JobOffers = () => {
  const { data, loading } = useQuery<Response>(ALL_USERS_OFFERS);
  if (loading) return <Spinner loading={loading} size={50} small />;
  if (!data)
    return (
      <>
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
                  date={offer.date}
                  localisation={offer.localisation}
                />
              ))}
            </JobOffersWrapper>
          )}
        </Container>
      </>
    );
};

export default JobOffers;
