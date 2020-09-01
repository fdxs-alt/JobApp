import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { size } from '../DefaultValues/HardCoded';
export const Container = styled.div`
  width: 85%;
  margin: 2.3rem auto;
`;
export const JobInfromation = styled.div`
  width: 100%;
  border-left: 3px solid ${(props) => props.theme.colors.darkish};
  border-top: 2px solid ${(props) => props.theme.colors.border};
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  padding: 1.2rem 0.8rem;
  display: flex;
  max-width: 1500px;
  margin: auto;
  @media (max-width: ${size.laptop}) {
    flex-direction: column;
  }
`;
export const Column = styled.div`
  display: flex;
  width: 45%;
  align-items: center;

  @media (max-width: ${size.laptop}) {
    width: 100%;
  }
`;
export const Title = styled(Link)`
  width: 30%;
  font-size: 1.4rem;
  padding: 0.4rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkish};
  text-align: center;
  &:hover {
    color: red;
  }

  @media (max-width: ${size.laptop}) {
    width: 35%;
  }

  @media (max-width: ${size.tablet}) {
    font-size: 1rem;
  }
`;
export const Logo = styled.img`
  width: 50px;
  margin-right: 1rem;
`;
export const Salary = styled.div`
  width: 25%;
  text-align: center;
  padding: 0.3rem;
  color: ${(props) => props.theme.colors.fontColor};
  border: 2px solid ${(props) => props.theme.colors.fontColor};
  text-align: center;
  @media (max-width: ${size.laptop}) {
    border: none;
    width: 33%;
  }

  @media (max-width: ${size.tablet}) {
    font-size: 0.8rem;
  }
`;
export const LightInfo = styled.p`
  width: 30%;
  color: ${(props) => props.theme.colors.fontColor};
  font-size: 1.3rem;
  text-align: center;
  padding: 0.5rem;
  @media (max-width: ${size.laptop}) {
    width: 33%;
    font-size: 1.1rem;
  }

  @media (max-width: ${size.tablet}) {
    font-size: 0.9rem;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 0.8rem;
  }
`;
export const ColumWithSalary = styled.div`
  display: flex;
  width: 55%;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${size.laptop}) {
    width: 100%;
    justify-content: space-between;
  }
`;
