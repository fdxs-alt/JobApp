import styled from 'styled-components';
import { size } from '../DefaultValues/HardCoded';

export const Container = styled.div`
  width: 75%;
  margin: 2.5rem auto;
`;
export const CompanyQuantity = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  font-size: 2rem;
  font-weight: 500;
  padding: 0.4rem;
  margin-bottom: 0.6rem;
  max-width: 1200px;
  margin: auto;

  @media (max-width: ${size.laptop}) {
    font-size: 1.5rem;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 1.2rem;
  }
`;
export const Button = styled.button`
  padding: 0.4rem 0.6rem;
  background-color: white;
  border: 2px solid ${(props) => props.theme.colors.lighterBorder};
  color: ${(props) => props.theme.colors.secondaryFont};
`;
export const PaginationButtonsContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const CompanyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.4rem;
  max-width: 1200px;
  margin: auto;
  gap: 2rem;

  @media (max-width: ${size.laptop}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;
export const SingleComapny = styled.div`
  display: flex;
  padding: 0.4rem;
  border: 2px solid ${(props) => props.theme.colors.lighterBorder};
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.darkish};
  }
`;
export const Logo = styled.img`
  width: 25%;

  @media (max-width: ${size.mobile}) {
    width: 40%;
  }
`;
export const CompanyName = styled.p`
  flex: 75%;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkish};
  font-weight: 500;
  padding: 0.4rem;
  overflow: hidden;
  justify-self: center;

  @media (max-width: ${size.tablet}) {
    font-size: 1rem;
  }
`;
