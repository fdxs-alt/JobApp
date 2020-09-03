import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_OFFERS } from '../Graphql/Queries';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import {
  TitleAndCompanyColumn,
  OfferTitle,
  CompanyInfo,
  LocalisationColumn,
  LocalisationInfo,
  Icon,
  JobInfromation,
} from '../styles/RandomJobOfferStyles';
import Spinner from './Spinner';

const RandomJobOffers = () => {
  const { data, loading, error } = useQuery(GET_RANDOM_OFFERS, {
    fetchPolicy: 'network-only',
  });

  if (loading) return <Spinner size={50} small loading={loading} />;
  else
    return (
      <div>
        {data.getRandomJobOffers.map((element: any) => (
          <JobInfromation key={element.id}>
            <TitleAndCompanyColumn>
              <OfferTitle to={`/specific?id=${element.id}`}>
                {element.title}
              </OfferTitle>
              <CompanyInfo>in {element.company.companyName}</CompanyInfo>
            </TitleAndCompanyColumn>

            <LocalisationColumn>
              {element.onlineRecrutation && <Icon icon={faMicrophone} />}
              <LocalisationInfo>{element.localisation}</LocalisationInfo>
            </LocalisationColumn>
          </JobInfromation>
        ))}
      </div>
    );
};

export default RandomJobOffers;
