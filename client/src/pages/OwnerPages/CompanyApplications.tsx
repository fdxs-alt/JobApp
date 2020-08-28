import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { useQuery } from '@apollo/client';
import { GET_ALL_CVS } from '../../Graphql/Queries';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExternalLinkAlt,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DELETE_CV } from '../../Graphql/CompanyMutations';
const Wrapper = styled.div`
  width: 80%;
  margin: 2.3rem auto;
`;
const Container = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  border-left: 3px solid ${(props) => props.theme.colors.darkish};
  border-top: 2px solid ${(props) => props.theme.colors.lightGray};
  border-right: 2px solid ${(props) => props.theme.colors.lightGray};
  border-bottom: 2px solid ${(props) => props.theme.colors.lightGray};
  margin-bottom: 3px;
`;
const NoFeedback = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  align-self: center;
`;
const JobOfferTitle = styled.p`
  color: ${(props) => props.theme.colors.darkish};
  padding: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  align-self: flex-start;
`;
const PdfLink = styled.a`
  text-decoration: none;
  align-self: flex-start;
  font-size: 1.1rem;
  color: ${(props) => props.theme.colors.darkish};
  position: relative;
  &::before {
    content: '';
    width: 0;
  }
  &:hover {
    color: red;
    &::before {
      background-color: red;
      height: 2px;
      position: absolute;
      bottom: -1px;
      transition: width 0.3s ease-in-out;
      width: 100%;
    }
  }
`;
const DeleteIcon = styled(FontAwesomeIcon)`
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;
const LinkContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;
const CompanyApplications = () => {
  const { data, loading } = useQuery(GET_ALL_CVS);
  const [remove, { loading: deleteCvLoading }] = useMutation(DELETE_CV);
  console.log(data);
  if (loading) return null;
  return (
    <>
      <Navbars />
      <Wrapper>
        {data.getAllCvs.map((element: any, index: number) => (
          <Container key={element.joboffer.id}>
            <JobOfferTitle>
              {index + 1}. {element.joboffer.title} ({element.joboffer.date})
            </JobOfferTitle>
            {element.cvs.length !== 0 ? (
              element.cvs.map((cv: any, index: number) => (
                <LinkContainer key={cv.id}>
                  <PdfLink
                    href={`http://localhost:5000/cv/${cv.name}`}
                    target="_blank"
                  >
                    {index + 1}. Click to see{' '}
                    <FontAwesomeIcon icon={faExternalLinkAlt} />
                  </PdfLink>
                  {!deleteCvLoading && (
                    <DeleteIcon
                      icon={faTrashAlt}
                      onClick={async () => {
                        await remove({
                          variables: { id: cv.id, jobId: element.joboffer.id },
                          refetchQueries: [{ query: GET_ALL_CVS }],
                        });
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
    </>
  );
};

export default CompanyApplications;
