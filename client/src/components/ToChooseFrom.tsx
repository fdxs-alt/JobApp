import React, { useState } from 'react';
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
`;

const ToChooseFrom: React.FC<Props> = ({ text, handleClick }) => {
  return <Container onClick={() => handleClick(text)}>{text}</Container>;
};

export default ToChooseFrom;
