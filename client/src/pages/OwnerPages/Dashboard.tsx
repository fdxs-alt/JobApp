import React from 'react';
import Navbars from '../../components/Navbars';
import {
  Container,
  GridContainer,
  DashboardTitle,
  Title,
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
          
        </GridContainer>
      </Container>
    </>
  );
};

export default Dashboard;
