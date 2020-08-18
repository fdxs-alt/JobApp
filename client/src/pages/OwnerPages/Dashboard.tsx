import React from 'react';
import Navbars from '../../components/Navbars';
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
} from '../../styles/Dashboard';
import { GET_INFORMATION } from '../../Graphql/Queries';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
type Offer = {
  id: number;
  title: string;
};

const Dashboard = () => {
  const { data, loading } = useQuery(GET_INFORMATION);
  console.log(data);
  if (loading) return <Navbars />;
  else
    return (
      <>
        <Navbars />

        <Container>
          <GridContainer>
            <DashboardTitle>
              <Title>Dashboard</Title>
            </DashboardTitle>

            <CompanyInfoContainer>
              {data.getUserCompany ? (
                <>
                  <CompanyInfoElement>
                    <b>Owner:</b> {data.getUser.fullName}
                  </CompanyInfoElement>
                  <CompanyInfoElement>
                    <b>Company name</b> {data.getUserCompany.companyName}
                  </CompanyInfoElement>
                  <CompanyInfoElement>
                    <b>Localisation:</b> {data.getUserCompany.localisation}
                  </CompanyInfoElement>
                  <CompanyInfoElement>
                    <b>Size of company:</b> {data.getUserCompany.sizeOfCompany}
                  </CompanyInfoElement>
                  <CompanyInfoElement>
                    <b> Technologies:</b>{' '}
                    {data.getUserCompany.technologies.join(', ')}
                  </CompanyInfoElement>
                  <CompanyInfoElement>
                    <b>Benefits:</b> {data.getUserCompany.benefits.join(', ')}
                  </CompanyInfoElement>
                </>
              ) : (
                <Link to="/createCompany">Create comapny!</Link>
              )}
            </CompanyInfoContainer>

            <JobOfferContainer>
              {data.allUsersOffers.length !== 0 ? (
                <>
                  <Column>
                    <FontAwesomeIcon
                      icon={faBriefcase}
                      style={{ fontSize: '12vh' }}
                    />
                    <JobOffersQuantity>
                      Your job offers: {data.allUsersOffers.length}
                    </JobOffersQuantity>
                  </Column>
                  <JobOfferColums style={{ letterSpacing: '2px' }}>
                    Offers:
                    {data.allUsersOffers.map((t: Offer) => (
                      <CompanyInfoElement key={t.id}>
                        {t.title}
                      </CompanyInfoElement>
                    ))}
                  </JobOfferColums>
                </>
              ) : (
                <Link to="/createJobOffer">Create job offer!</Link>
              )}
            </JobOfferContainer>
            <ButtonContainer>
              <Link to="/createJobOffer">Create job offer</Link>
              <Link to="/profile">See your company</Link>
            </ButtonContainer>
          </GridContainer>
        </Container>
      </>
    );
};

export default Dashboard;
