import React, { useCallback } from 'react';
import { parse } from 'query-string';
import { useQuery, useMutation } from '@apollo/client';
import { SPECIFIC_JOB_OFFER, GET_ALL_JOB_IMAGES } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { ADD_IMAGE } from '../../Graphql/CompanyMutations';
import Navbars from '../../components/Navbars';
import ImagesGallery from '../../components/ImagesGallery';
import {
  Icon,
  Main,
  Title,
  BasicInfo,
  IconContainer,
  ColumContainer,
  Used,
  GridContainer,
  Element,
  Text,
} from '../../styles/CompanyProfileStyle';
import { faMoneyBillAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons';
const JobDetails = () => {
  const id = parseInt((parse(window.location.search) as any).id);
  const { data, loading, error } = useQuery(SPECIFIC_JOB_OFFER, {
    variables: { id },
  });
  const [add] = useMutation(ADD_IMAGE, {
    refetchQueries: [
      {
        query: GET_ALL_JOB_IMAGES,
        variables: { id },
      },
    ],
  });
  const onDrop = useCallback(
    async ([file]) => {
      await add({
        variables: {
          id,
          file,
        },
      });
    },

    [add],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loading) return <Navbars />;
  else if (error) return <Redirect to="/joboffers" />;
  else
    return (
      <>
        <Navbars />
        <Main>
          <Title>{data.specificJobOffer.title}</Title>
          <BasicInfo>
            <IconContainer>
              <Icon icon={faMoneyBillAlt} />
              <Text>Minimum salary: {data.specificJobOffer.minSalary}</Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMoneyBill} />
              <Text>Maximum salary: {data.specificJobOffer.maxSalary}</Text>
            </IconContainer>
          </BasicInfo>

          <ColumContainer>
            <Used>Mandatory skills:</Used>
            <GridContainer>
              {data.specificJobOffer.mandatory.map(
                (mandatory: string, index: number) => (
                  <Element key={index}>{mandatory}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Extra skills: </Used>
            <GridContainer>
              {data.specificJobOffer.extraSkills.map(
                (skill: string, index: number) => (
                  <Element key={index}>{skill}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Tasks during employment:</Used>
            <GridContainer>
              {data.specificJobOffer.tasks.map(
                (task: string, index: number) => (
                  <Element key={index}>{task}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Benefits:</Used>
            <GridContainer>
              {data.specificJobOffer.benefitsInWork.map(
                (benefit: string, index: number) => (
                  <Element key={index}>{benefit}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ImagesGallery id={id} />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        </Main>
      </>
    );
};

export default JobDetails;
