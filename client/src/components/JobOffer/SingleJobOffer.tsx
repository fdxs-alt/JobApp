import React from 'react';
import styled from 'styled-components';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
type Props = {
  title: string;
  id: number;
};
const Container = styled.div`
  padding: 2rem;
  background-color: white;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  margin-bottom: 1.2rem;
`;
const Title = styled.h4`
  flex: 5;
`;
const IconLink = styled(Link)`
  color: black;
  border: 1px solid ${(props) => props.theme.colors.lightBorder};
  padding: 1rem 1.2rem;
`;
const SingleJobOffer: React.FC<Props> = ({ title, id }) => {
  return (
    <Container>
      <Title>{title}</Title>
      <IconLink to={`/job?id=${id}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconLink>
    </Container>
  );
};

export default SingleJobOffer;
