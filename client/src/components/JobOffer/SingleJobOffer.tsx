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
import { confirmAlert } from 'react-confirm-alert';
import { Confirmation } from '../../styles/ImagesGallery';
import { ButtonContainer, Button } from '../../styles/ImagesGallery';
import { Title as ConfrimationTitle } from '../../styles/SearchBarStyles';
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
            ...(jobOffers!.allUsersOffers as any).filter(
              (t: ArrayProp) => t.id !== id,
            ),
          ],
        },
      });
    },
  });
  const handleClick = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <ConfrimationTitle>Are you sure?</ConfrimationTitle>
            <Confirmation>
              Do you really want to delete this job offer?{' '}
              <b>You can't undo this action</b>
            </Confirmation>

            <ButtonContainer>
              <Button onClick={onClose}>No</Button>
              <Button
                onClick={async () => {
                  await deleteJobOffer();
                  onClose();
                }}
              >
                Yes
              </Button>
            </ButtonContainer>
          </div>
        );
      },
    });
  };

  return (
    <Container>
      <Title>{title}</Title>
      <Title>
        {date}
        {'   '} {localisation}
      </Title>
      <IconLink to={`/job?id=${id}`}>
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconLink>
      <DeleteButton onClick={() => handleClick()} tabIndex={0}>
        <FontAwesomeIcon icon={faTrashAlt} />
      </DeleteButton>
    </Container>
  );
};

export default SingleJobOffer;
