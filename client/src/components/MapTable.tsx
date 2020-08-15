import React from 'react';
import { GridWrapper } from '../styles/CreateCompanyStyles';
import styled from 'styled-components';
type Props = {
  table: string[];
  handleClick: (arg: string) => void;
};
const Element = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 0.9rem;
  padding: 0.3rem 0.6rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  color: ${(props) => props.theme.colors.fontColor};
  cursor: pointer;

  &:focus {
    border: 1px solid black;
  }
`;
const MapTable: React.FC<Props> = ({ table, handleClick }) => {
  return table.length === 0 ? null : (
    <GridWrapper>
      {table.map((element, index) => (
        <Element
          key={index}
          tabIndex={0}
          onClick={() => handleClick(element)}
          onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter') handleClick(element);
          }}
        >
          {element}
        </Element>
      ))}
    </GridWrapper>
  );
};

export default MapTable;
