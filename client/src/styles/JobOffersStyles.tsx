import styled from 'styled-components';
import { Link } from 'react-router-dom';
export const JobOffersWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
`;
export const Container = styled.div`
  padding: 2rem;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  margin-bottom: 1.2rem;
`;
export const Title = styled.p`
  flex: 5;
  color: ${(props) => props.theme.colors.darkish};
`;
export const IconLink = styled(Link)`
  color: black;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  padding: 1rem 1.2rem;
`;
export const DeleteButton = styled.div`
  color: black;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  padding: 1rem 1.2rem;
  background-color: inherit;
  margin-left: 1.3rem;
  cursor: pointer;
`;
