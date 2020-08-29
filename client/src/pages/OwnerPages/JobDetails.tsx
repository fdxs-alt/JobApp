import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { SPECIFIC_JOB_OFFER } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import Navbars from '../../components/Navbars/Navbars';
import ImagesGallery from '../../components/JobOffer/ImagesGallery';
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
  Description,
} from '../../styles/CompanyProfileStyle';
import {
  faMoneyBillAlt,
  faMoneyBill,
  faMicrochip,
  faHome,
} from '@fortawesome/free-solid-svg-icons';

type Response = {
  specificJobOffer: {
    benefitsInWork: string[];
    extraSkills: string[];
    mandatory: string[];
    maxSalary: number;
    minSalary: number;
    onlineRecrutation: boolean;
    tasks: string[];
    title: string[];
    main: string;
    description: string;
    localisation: string;
    date: string;
  };
};

const JobDetails = () => {
  const id = parseInt((parse(window.location.search) as any).id);
  const { data, loading, error } = useQuery<Response>(SPECIFIC_JOB_OFFER, {
    variables: { id },
  });

  if (loading) return <Navbars />;
  else if (error) return <Redirect to="/joboffers" />;
  else
    return (
      <>
        <Navbars />
        <Main>
          <Title>{data!.specificJobOffer.title}</Title>
          <BasicInfo>
            <IconContainer>
              <Icon icon={faMoneyBillAlt} />
              <Text>
                Minimum salary: <b>{data!.specificJobOffer.minSalary}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faHome} />
              <Text>
                Localisation: <b>{data!.specificJobOffer.localisation}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMoneyBill} />
              <Text>
                Maximum salary: <b>{data!.specificJobOffer.maxSalary}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMicrochip} />
              <Text>
                Main technology: <b>{data!.specificJobOffer.main}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMicrochip} />
              <Text>
                Date of publish: <b>{data!.specificJobOffer.date}</b>
              </Text>
            </IconContainer>
          </BasicInfo>
          <Description>
            <h3>Description:</h3>
            {data!.specificJobOffer.description}
          </Description>
          <ColumContainer>
            <Used>Mandatory skills:</Used>
            <GridContainer>
              {data!.specificJobOffer.mandatory.map(
                (mandatory: string, index: number) => (
                  <Element key={index}>{mandatory}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Extra skills: </Used>
            <GridContainer>
              {data!.specificJobOffer.extraSkills.map(
                (skill: string, index: number) => (
                  <Element key={index}>{skill}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Tasks during employment:</Used>
            <GridContainer>
              {data!.specificJobOffer.tasks.map(
                (task: string, index: number) => (
                  <Element key={index}>{task}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ColumContainer>
            <Used>Benefits:</Used>
            <GridContainer>
              {data!.specificJobOffer.benefitsInWork.map(
                (benefit: string, index: number) => (
                  <Element key={index}>{benefit}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
          <ImagesGallery id={id} />
        </Main>
      </>
    );
};

export default JobDetails;
