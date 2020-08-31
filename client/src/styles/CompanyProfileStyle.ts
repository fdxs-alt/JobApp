import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { size } from '../DefaultValues/HardCoded';
export const Icon = styled(FontAwesomeIcon)`
  font-size: '1.6rem';
  margin-bottom: '10px';
  padding: '0.2rem';
  border: '1px solid black';
  box-sizing: 'content-box';
`;
export const CreateLink = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  text-align: center;
  align-self: center;
`;
export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: ${(props) => props.theme.colors.border};
  display: flex;
  justify-content: center;
`;
export const Main = styled.section`
  width: 80%;
  margin: auto;
  & > div {
    border: 1px solid ${(props) => props.theme.colors.lightGray};
  }
  & > div + div {
    border-top: none;
  }
  padding: 1.2rem 0;
`;
export const Title = styled.div`
  padding: 1.4rem;
  font-size: 2.2rem;
  font-weight: 700;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${size.mobile}) {
    font-size: 1.5rem;
  }
`;
export const BasicInfo = styled.div`
  padding: 2rem;
`;
export const IconContainer = styled.span`
  display: flex;
  align-items: center;
`;
export const Text = styled.span`
  font-size: 1.3rem;
  padding: 0.6rem;
  @media (max-width: ${size.mobile}) {
    font-size: 1rem;
  }
`;
export const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  padding: 2rem;
  text-align: justify;

  @media (max-width: ${size.tablet}) {
    font-size: 1rem;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 0.9rem;
    line-height: 1.3rem;
  }
`;
export const GridContainer = styled.div`
  font-size: 1rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;

  @media (max-width: ${size.tablet}) {
    gap: 0.6rem;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: ${size.mobile}) {
    gap: 0.4rem;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const Element = styled.span`
  padding: 0.5rem 0.8rem;
  border: 2px solid ${(props) => props.theme.colors.button};
  display: flex;
  align-items: center;

  @media (max-width: ${size.mobile}) {
    font-size: 0.8rem;
  }
`;
export const ColumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Used = styled.p`
  padding: 1rem 0rem 0rem 1rem;
  font-size: 1.5rem;

  @media (max-width: ${size.mobile}) {
    font-size: 1.2rem;
  }
`;
export const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: #00e676;
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
  font-size: 1.5rem;

  @media (max-width: ${size.laptop}) {
    font-size: 1.1rem;
  }
  @media (max-width: ${size.tablet}) {
    font-size: 1rem;
    padding: 0.8rem;
    margin-left: 0.8rem;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
`;
export const LogoImage = styled.img`
  height: 250px;

  @media (max-width: ${size.tablet}) {
    height: 150px;
  }

  @media (max-width: ${size.mobile}) {
    height: 100px;
  }
`;
export const NoAppsInformation = styled.p`
  font-size: 2rem;
  text-align: center;
  align-self: center;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkish};
`;
