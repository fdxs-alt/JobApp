import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconLink, Container, Title } from '../../styles/JobOffersStyles';

type Props = {
  title: string;
  id: number;
};

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
