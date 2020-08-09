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
} from '../../styles/Dashboard';

const Dashboard = () => {
  return (
    <>
      <Navbars />
      <Container>
        <GridContainer>
          <DashboardTitle>
            <Title>Dashboard</Title>
          </DashboardTitle>
          <CompanyInfoContainer>Company info</CompanyInfoContainer>
          <JobOfferContainer>Offers Info</JobOfferContainer>
          <ButtonContainer>Buttons</ButtonContainer>
        </GridContainer>
      </Container>
    </>
  );
};

export default Dashboard;
