import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import {
  Container,
  GridContainer,
  DashboardTitle,
  Title,
  CompanyInfoContainer,
  JobOfferContainer,
  ButtonContainer,
  CompanyInfoElement,
  Column,
  JobOffersQuantity,
  JobOfferColums,
  NoCompanyLinkContainer,
  NoJobOfferLinkContainer,
  JobOfferElement,
} from '../../styles/Dashboard';
import { GET_INFORMATION } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CreateLink } from '../../styles/CompanyProfileStyle';

type Offer = {
  id: number;
  title: string;
};

type Response = {
  getUser: {
    fullName: string;
  };

  getUserCompany: {
    benefits: string[];
    companyName: string;
    description: string;
    yearOfSetUp: number;
    sizeOfCompany: number;
    localisation: string;
    technologies: string[];
  };

  allUsersOffers: Offer[];
};

const Dashboard = () => {
  const { data, loading } = useQuery<Response>(GET_INFORMATION);
  if (loading)
    return (
      <>
        <Navbars />
      </>
    );
  else
    return (
      <>
        <Navbars />

        <Container>
          <GridContainer>
            <DashboardTitle>
              <Title>Dashboard</Title>
            </DashboardTitle>

            {!data!.getUserCompany ? (
              <NoCompanyLinkContainer>
                <CreateLink to="/createCompany">Create company!</CreateLink>
              </NoCompanyLinkContainer>
            ) : (
              <CompanyInfoContainer>
                <CompanyInfoElement>
                  <b>Owner:</b> {data!.getUser.fullName}
                </CompanyInfoElement>
                <CompanyInfoElement>
                  <b>Company name</b> {data!.getUserCompany.companyName}
                </CompanyInfoElement>
                <CompanyInfoElement>
                  <b>Localisation:</b> {data!.getUserCompany.localisation}
                </CompanyInfoElement>
                <CompanyInfoElement>
                  <b>Size of company:</b> {data!.getUserCompany.sizeOfCompany}
                </CompanyInfoElement>
                <CompanyInfoElement>
                  <b> Technologies:</b>{' '}
                  {data!.getUserCompany.technologies.join(', ')}
                </CompanyInfoElement>
                <CompanyInfoElement>
                  <b>Benefits:</b> {data!.getUserCompany.benefits.join(', ')}
                </CompanyInfoElement>
              </CompanyInfoContainer>
            )}

            {data!.allUsersOffers.length !== 0 ? (
              <JobOfferContainer>
                <Column>
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ fontSize: '12vh' }}
                  />
                  <JobOffersQuantity>
                    Your job offers: {data!.allUsersOffers.length}
                  </JobOffersQuantity>
                </Column>
                <JobOfferColums style={{ letterSpacing: '2px' }}>
                  <h5 style={{ gridColumn: '1/3', textAlign: 'center' }}>
                    Offers:
                  </h5>
                  {data!.allUsersOffers.map((t: Offer, index: number) => (
                    <JobOfferElement to={`/job?id=${t.id}`} key={t.id}>
                      <b>{index + 1}</b>. {t.title}
                    </JobOfferElement>
                  ))}
                </JobOfferColums>
              </JobOfferContainer>
            ) : (
              <NoJobOfferLinkContainer>
                {' '}
                <CreateLink to="/createJobOffer">Create job offer!</CreateLink>
              </NoJobOfferLinkContainer>
            )}

            {data!.allUsersOffers.length !== 0 && data!.getUserCompany && (
              <ButtonContainer>
                <CreateLink
                  to="/createJobOffer"
                  style={{ marginBottom: '1.2rem' }}
                >
                  Create job offer!
                </CreateLink>
                <CreateLink to="/profile">See your company!</CreateLink>
              </ButtonContainer>
            )}
          </GridContainer>
        </Container>
      </>
    );
};

export default Dashboard;
