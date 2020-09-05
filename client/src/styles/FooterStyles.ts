import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { size } from '../DefaultValues/HardCoded';

export const FooterWrapper = styled.section`
  width: 100%;
  background-color: #191919;
`;
export const FooterContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  width: 75%;
  color: white;
  display: grid;
  padding: 3rem 5rem;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  justify-content: space-around;

  @media (max-width: ${size.tablet}) {
    width: 95%;
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ColumnTitle = styled.p`
  font-size: 1.1rem;
  padding: 0.4rem;

  @media (max-width: ${size.tablet}) {
    font-size: 1.2rem;
  }

  @media (max-width: ${size.mobile}) {
    font-size: 1rem;
  }
`;
export const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 0.2rem;
  font-size: 0.9rem;
  &:hover {
    color: red;
  }

  @media (max-width: ${size.tablet}) {
    font-size: 1rem;
  }
  @media (max-width: ${size.mobile}) {
    font-size: 0.8rem;
  }
`;
type ColumProps = {
  bgColor?: string;
};
export const Column = styled.div<ColumProps>`
  padding: 0 0.5rem;

  display: flex;
  flex-direction: column;
  border-left: 2px solid ${(props) => props.theme.colors.lightBorder};
  position: relative;
  &::after {
    content: '';
    position: absolute;
    height: 30px;
    width: 5px;
    top: 0;
    right: 0;
    left: -1px;
    bottom: 0;
    border-left: 5px solid ${(props) => props.bgColor};
  }
`;
