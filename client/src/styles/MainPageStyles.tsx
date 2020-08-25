import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
`;
export const Column = styled.div`
  display: flex;
  width: 45%;
  align-items: center;
`;
export const Title = styled(Link)`
  font-size: 1.4rem;
  padding: 0.4rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.darkish};
  &:hover {
    color: red;
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
`;
export const LightInfo = styled.p`
  color: ${(props) => props.theme.colors.fontColor};
  font-size: 1.3rem;
  padding: 0.5rem;
`;
export const ColumWithSalary = styled.div`
  display: flex;
  width: 55%;
  align-items: center;
  justify-content: space-between;
`;
