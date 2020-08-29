import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_RANDOM_OFFERS } from '../Graphql/Queries';
import { JobInfromation } from '../styles/MainPageStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import {
  TitleAndCompanyColumn,
  OfferTitle,
  CompanyInfo,
  LocalisationColumn,
  LocalisationInfo,
} from '../styles/RandomJobOfferStyles';

const RandomJobOffers = () => {
  const { data, loading, error } = useQuery(GET_RANDOM_OFFERS, {
    fetchPolicy: 'network-only',
  });
  console.log(data);
  if (loading || error) return null;
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
              {element.onlineRecrutation && (
                <FontAwesomeIcon
                  icon={faMicrophone}
                  style={{ marginRight: '0.5rem', fontSize: '1.5rem' }}
                />
              )}
              <LocalisationInfo style={{ padding: '0 2rem' }}>
                {element.localisation}
              </LocalisationInfo>
            </LocalisationColumn>
          </JobInfromation>
        ))}
      </div>
    );
};

export default RandomJobOffers;
