import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.header`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
  width: 100%;
  display: flex;
  align-content: space-around;
  color: white;
  background-color: ${(props) => props.theme.colors.dark};
  font-size: 1.1rem;
  font-weight: 600;
  justify-content: space-between;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightBorder};
`;
export const LeftPanel = styled.ul`
  list-style-type: none;
  width: 50%;
  display: flex;
  align-items: center;
`;

export const RightPanel = styled.ul`
  list-style-type: none;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LeftElement = styled.li`
  border-bottom: 4px solid ${(props) => props.theme.colors.dark};
  width: 20%;
  padding: 2rem 0;
  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-align: center;
  text-transform: uppercase;
  &:hover {
    border-bottom: 4px solid ${(props) => props.theme.colors.button};
  }
`;
export const RightElement = styled.li`
  border-bottom: 4px solid ${(props) => props.theme.colors.dark};
  width: 20%;
  padding: 2rem 0;
  border-right: 1px solid ${(props) => props.theme.colors.lightBorder};
  text-align: center;
  text-transform: uppercase;
  &:first-child {
    border-left: 1px solid ${(props) => props.theme.colors.lightBorder};
  }
  &:last-child {
    border-right: none;
  }
  &:hover {
    border-bottom: 4px solid ${(props) => props.theme.colors.button};
  }
`;
export const MyLink = styled(Link)`
  text-decoration: none;
  color: white;
`;
