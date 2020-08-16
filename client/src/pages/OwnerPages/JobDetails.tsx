import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { SPECIFIC_JOB_OFFER } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import Navbars from '../../components/Navbars';
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
  const { data, loading, error } = useQuery(SPECIFIC_JOB_OFFER, {
    variables: { id: parseInt((parse(window.location.search) as any).id) },
  });

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
        </Main>
      </>
    );
};

export default JobDetails;
