import styled from 'styled-components';
import { size } from '../DefaultValues/HardCoded';

export const Section = styled.form`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  @media (max-width: ${size.tablet}) {
    padding: 2rem;
  }
`;
export const Title = styled.h1`
  width: 75%;
  max-width: 1200px;
  margin: auto;
  color: white;
  font-size: 2.4rem;
  font-weight: 500;
  padding: 0.8rem;
  text-align: center;
  @media (max-width: ${size.tablet}) {
    font-size: 1.5rem;
    padding: 0.8rem 0rem;
    width: 100%;
  }
  @media (max-width: ${size.mobile}) {
    padding: 0rem;
  }
`;
export const Container = styled.div`
  width: 40%;
  display: flex;
  padding: 0.5rem;
  max-width: 800px;

  @media (max-width: ${size.laptop}) {
    width: 60%;
  }

  @media (max-width: ${size.tablet}) {
    width: 80%;
    flex-direction: column;
    justify-items: center;
    align-items: center;
  }

  @media (max-width: ${size.mobile}) {
    width: 100%;
  }
`;
export const SearchInput = styled.input`
  width: 75%;
  padding: 0.8rem;
  font-size: 1.2rem;

  @media (max-width: ${size.laptop}) {
    padding: 0.8rem;
    width: 65%;
    font-size: 1rem;
  }

  @media (max-width: ${size.mobile}) {
    width: 100%;
    font-size: 0.8rem;
  }
`;
export const Button = styled.button`
  width: 30%;
  font-size: 1.2rem;
  background-color: ${(props) => props.theme.colors.button};
  border: none;
  color: white;
  padding: 0.8rem;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: ${size.tablet}) {
    width: 40%;
    margin-top: 2vh;
    font-size: 1rem;
  }

  @media (max-width: ${size.mobile}) {
    width: 60%;
    margin-top: 1vh;
  }
`;
