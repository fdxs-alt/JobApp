import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { size } from '../DefaultValues/HardCoded';
export const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.theme.colors.border};
  min-height: 100vh;
  display: flex;
  font-size: 1.1rem;
  flex-direction: column;
`;
export const MyLink = styled(Link)`
  color: ${(props) => props.theme.colors.fontColor};
  text-decoration: none;
  font-size: 1.2rem;
`;
export const FormContainer = styled.form`
  max-width: 1000px;
  width: 35%;
  padding: 3rem 0.1rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;  
  margin: 5% auto;
  @media (max-width: ${size.laptop}) {
    width: 60%;
  }

  @media (max-width: ${size.tablet}) {
    width: 80%;
  }
`;
export const Title = styled.h2`
  width: 100%;
  font-size: 2rem;
  text-align: center;
  padding: 0 1rem 1rem 1rem;
  @media (max-width: ${size.tablet}) {
    font-size: 1.6rem;
  }
`;

export const Input = styled.input`
  width: 90%;
  padding: 0.8rem 0.6rem;
  font-size: 1rem;
  margin-bottom: 0.8rem;
  margin-top: 0.2rem;
  border: 3px solid ${(props) => props.theme.colors.border2};
  &::placeholder {
    color: ${(props) => props.theme.colors.fontColor};
  }
`;
interface InputLabelProps {
  width?: number;
}
export const InputLabel = styled.label<InputLabelProps>`
  width: ${(props) => (props.width ? props.width + '%' : '90%')};
  color: ${(props) => props.theme.colors.fontColor};
  padding: 0.9rem 0.6rem;
  display: flex;
`;
export const LinkContainer = styled.div`
  padding: 2rem;
  color: ${(props) => props.theme.colors.fontColor};
`;
export const Icon = styled(FontAwesomeIcon)`
  margin-right: 5px;
`;
export const Error = styled.p`
  width: 90%;
  color: red;
  padding: 0 0 0.6rem 0;

  @media (max-width: ${size.laptop}) {
    font-size: 0.9rem;
  }
`;
export const Paragraph = styled.p`
  color: ${(props) => props.theme.colors.fontColor};
  text-align: center;
  width: 70%;
`;
