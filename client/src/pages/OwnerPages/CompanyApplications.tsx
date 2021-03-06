import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_CVS } from '../../Graphql/Queries';
import {
  faExternalLinkAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DELETE_CV } from '../../Graphql/CompanyMutations';
import {
  Confirmation,
  Title,
  Button,
  ButtonContainer,
} from '../../styles/ImagesGallery';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {
  Container,
  DeleteIcon,
  JobOfferTitle,
  NoFeedback,
  Wrapper,
  LinkContainer,
  PdfLink,
} from '../../styles/CompanyApplicationStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Spinner from '../../components/Spinner';
type Response = {
  getAllCvs: {
    joboffer: {
      id: number;
      title: string;
      date: string;
    };
    cvs: {
      id: number;
      name: string;
      user: {
        fullName: string;
      };
    };
  };
};
const CompanyApplications = () => {
  const { data, loading } = useQuery(GET_ALL_CVS, { pollInterval: 5000 });
  const [remove, { loading: deleteCvLoading }] = useMutation<Response>(
    DELETE_CV,
  );

  if (loading) return <Spinner size={100} loading={loading} />;

  const handleDelete = (id: number, jobId: number) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div>
            <Title>Are you sure?</Title>
            <Confirmation>
              Do you really want to delete this cv? This action cant be undone
            </Confirmation>
            <ButtonContainer>
              <Button onClick={onClose}>No</Button>
              <Button
                onClick={async () => {
                  await remove({
                    variables: { id, jobId },
                    update: (cache) => {
                      cache.evict({ id: 'Cv:' + id });
                    },
                  });
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
    <>
      {data && (
        <Wrapper>
          {data.getAllCvs.map((element: any, index: number) => (
            <Container key={element.joboffer.id}>
              <JobOfferTitle>
                {index + 1}. {element.joboffer.title} ({element.joboffer.date})
              </JobOfferTitle>
              {element.cvs.length !== 0 ? (
                element.cvs.map((cv: any, index: number) => (
                  <LinkContainer key={cv.id}>
                    <PdfLink href={`/cv/${cv.name}`} target="_blank">
                      {index + 1}. {cv.user.fullName}'s CV {'  '}
                      <FontAwesomeIcon icon={faExternalLinkAlt} />
                    </PdfLink>
                    {!deleteCvLoading && (
                      <DeleteIcon
                        icon={faTrashAlt}
                        onClick={() => {
                          handleDelete(cv.id, element.joboffer.id);
                        }}
                      />
                    )}
                  </LinkContainer>
                ))
              ) : (
                <NoFeedback>No feedback yet</NoFeedback>
              )}
            </Container>
          ))}
        </Wrapper>
      )}
    </>
  );
};

export default CompanyApplications;
