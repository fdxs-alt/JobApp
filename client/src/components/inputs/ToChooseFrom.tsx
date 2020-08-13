import React from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  handleClick: (benefit: string) => void;
};
const Container = styled.div`
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

const ToChooseFrom: React.FC<Props> = ({ text, handleClick }) => {
  return (
    <Container
      onClick={() => handleClick(text)}
      onKeyPress={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') handleClick(text);
      }}
      tabIndex={0}
    >
      {text}
    </Container>
  );
};

export default ToChooseFrom;
