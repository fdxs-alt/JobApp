import styled from 'styled-components';
export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.border};
  width: 100%;
  padding: 2rem;
`;
export const GridContainer = styled.div`
  min-height: 90vh;
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 0.5fr;
  grid-template-rows: 0.25fr 1fr 1fr;
  margin: auto;
  gap: 2rem;
`;
export const DashboardTitle = styled.div`
  grid-column: 1/3;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 2rem;
`;
export const Title = styled.h1`
  font-size: 3rem;
  padding: 2rem;
`;
export const CompanyInfoContainer = styled.div`
  grid-column: 1/3;
  background-color: white;
  padding: 2rem;
`;
export const JobOfferContainer = styled.div`
  background-color: white;
  padding: 2rem;
  display: flex;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  background-color: white;
`;
export const CompanyInfoElement = styled.div`
  font-size: 1.3rem;
  padding: 1rem;
  letter-spacing: 2px;
`;
export const Column = styled.div`
  padding: 2rem;
  width: 30%;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;
export const JobOffersQuantity = styled.p`
  text-align: center;
  padding: 2rem;
`;
export const JobOfferColums = styled.div`
  padding: 2rem;
  width: 70%;
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  justify-content: center;
  align-items: center;
`;
