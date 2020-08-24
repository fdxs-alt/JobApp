import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  padding: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
  border-top: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
`;
export const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.8rem;
  padding: 2rem;
  text-align: justify;
`;
export const GridContainer = styled.div`
  font-size: 1rem;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.2rem;
`;
export const Element = styled.span`
  padding: 0.5rem 0.8rem;
  border: 2px solid ${(props) => props.theme.colors.button};
`;
export const ColumContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Used = styled.p`
  padding: 1rem 0rem 0rem 2rem;
  font-size: 1.5rem;
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
`;
export const LogoImage = styled.img`
  height: 250px;
`;
export const NoAppsInformation = styled.p`
  font-size: 2rem;
  text-align: center;
  align-self: center;
  font-weight: 500;
  color: ${(props) => props.theme.colors.darkish};
`;
