import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { size } from '../DefaultValues/HardCoded';
export const JobOffersWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
`;
export const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex: 2;
  @media (max-width: ${size.laptop}) {
    flex-direction: column;
  }
`;
export const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  padding: 2rem;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  justify-content: space-between;
  border: 1px solid ${(props) => props.theme.colors.fontColor};
  margin-bottom: 1.2rem;

  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
export const Title = styled.p`
  flex: 5;
  color: ${(props) => props.theme.colors.darkish};
  @media (max-width: ${size.mobile}) {
    font-size: 1rem;
  }
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
