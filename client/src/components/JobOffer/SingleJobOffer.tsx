import React from 'react';
import { faInfoCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  IconLink,
  Container,
  Title,
  DeleteButton,
  Wrapper,
} from '../../styles/JobOffersStyles';
import { DELETE_JOB_OFFER } from '../../Graphql/CompanyMutations';
import { useMutation } from '@apollo/client';
import { ALL_USERS_OFFERS } from '../../Graphql/Queries';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmationModal from '../Shared/ConfirmationModal';
type Props = {
  title: string;
  id: number;
  localisation: string;
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

const SingleJobOffer: React.FC<Props> = ({ title, id, date, localisation }) => {
  const [deleteJobOffer] = useMutation(DELETE_JOB_OFFER, {
    variables: { id },
    update: (store) => {
      const jobOffers = store.readQuery<QueryProps>({
        query: ALL_USERS_OFFERS,
      });
      store.writeQuery<QueryProps>({
        query: ALL_USERS_OFFERS,
        data: {
          allUsersOffers: [
            ...(jobOffers?.allUsersOffers as any).filter(
              (t: ArrayProp) => t.id !== id,
            ),
          ],
        },
      });
    },
  });
  const handleClick = async (onClose: () => void) => {
    await deleteJobOffer();
    onClose();
  };
  const handleDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmationModal
            title="Are you sure?"
            confirmationText="Do you really want to delete this job offer? You cant undo this action"
            handleClick={handleClick}
            onClose={onClose}
            deleteText="Yes"
          />
        );
      },
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>{title}</Title>
        <Title>{date}</Title>
        <Title> {localisation}</Title>
      </Wrapper>
      <div style={{ display: 'flex', padding: '1rem' }}>
        <IconLink to={`/job?id=${id}`}>
          <FontAwesomeIcon icon={faInfoCircle} />
        </IconLink>
        <DeleteButton onClick={() => handleDelete()} tabIndex={0}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </DeleteButton>
      </div>
    </Container>
  );
};

export default SingleJobOffer;
