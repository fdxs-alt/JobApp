import styled from 'styled-components';
export const Container = styled.div`
  background-color: ${(props) => props.theme.colors.border};
  width: 100%;

  padding: 2rem 0;
`;
export const GridContainer = styled.div`
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 0.25fr;
  grid-template-rows: 0.5fr 1fr 1fr;
  margin: auto;
  min-height: 80vh;
`;
export const DashboardTitle = styled.div`
  grid-column: 1/3;
  background-color: white;
  display: flex;
  align-items: center;
`;
export const Title = styled.h1`
  font-size: 3rem;
  padding: 2rem;
`;
