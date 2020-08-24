import React from 'react';
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
  date: string;
};
type ArrayProp = {
  __typename: string;
  title: string;
  id: number;
  date: string;
};
type QueryProps = {
  allUsersOffers: ArrayProp[];
};

const SingleJobOffer: React.FC<Props> = ({ title, id, date }) => {
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
      <Title>{date}</Title>
      <IconLink to={`/job?id=${id}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconLink>
      <DeleteButton onClick={() => deleteJobOffer()} tabIndex={0}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </DeleteButton>
    </Container>
  );
};

export default SingleJobOffer;
