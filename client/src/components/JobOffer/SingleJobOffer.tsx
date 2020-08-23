import React from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconLink,
  Container,
  Title,
  DeleteButton,
} from '../../styles/JobOffersStyles';
import { DELETE_JOB_OFFER } from '../../Graphql/CompanyMutations';
import { useMutation } from '@apollo/client';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
type Props = {
  title: string;
  id: number;
};
type ArrayProp = {
  __typename: string;
  title: string;
  id: number;
};
type QueryProps = {
  allUsersOffers: ArrayProp[];
};

const SingleJobOffer: React.FC<Props> = ({ title, id }) => {
  const [deleteJobOffer, { loading }] = useMutation(DELETE_JOB_OFFER, {
    variables: { id },
    update: (store) => {
      const jobOffers = store.readQuery<QueryProps>({
        query: ALL_USERS_OFFERS,
      });
      store.writeQuery<QueryProps>({
        query: ALL_USERS_OFFERS,
        data: {
          allUsersOffers: [
            ...(jobOffers!.allUsersOffers as any).filter(
              (t: ArrayProp) => t.id !== id,
            ),
          ],
        },
      });
    },
  });

  return (
    <Container>
      <Title>{title}</Title>
      <IconLink to={`/job?id=${id}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconLink>
      <DeleteButton onClick={() => deleteJobOffer()}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </DeleteButton>
    </Container>
  );
};

export default SingleJobOffer;
