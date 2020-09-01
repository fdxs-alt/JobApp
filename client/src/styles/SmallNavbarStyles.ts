import styled from 'styled-components';
import { Link } from 'react-router-dom';

type HeaderProps = {
  readonly opened: boolean;
};
export const LaptopHeader = styled.header<HeaderProps>`
  width: 100%;
  background-color: ${(props) => props.theme.colors.dark};
  display: flex;
  color: white;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1rem 2rem;
  justify-content: ${(props) => (props.opened ? 'center' : 'flex-end')};
  flex-direction: ${(props) => (props.opened ? 'column' : 'row')};
  align-items: center;
`;
export const LaptopLink = styled(Link)`
  width: 100%;
  text-decoration: none;
  color: white;
  padding: 0.4rem 0.2rem;
  font-size: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
  &:hover {
    border-bottom: 2px solid ${(props) => props.theme.colors.button};
  }
`;
