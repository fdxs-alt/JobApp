import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  text: string;
  handleClick: (benefit: string) => void;
};
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.border2};
  font-size: 0.9rem;
  padding: 0.5rem 0.6rem;
  border: 1px solid ${(props) => props.theme.colors.darkish};
  color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
`;

const Users: React.FC<Props> = ({ text, handleClick }) => {
  return (
    <Container onClick={() => handleClick(text)}>
      {text}
    </Container>
  );
};

export default Users;
