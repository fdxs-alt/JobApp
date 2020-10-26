import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { SPECIFIC_JOB_OFFER } from '../../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import ImagesGallery from '../../components/JobOffer/ImageGallery/ImagesGallery';
import {
  Icon,
  Main,
  Title,
  BasicInfo,
  IconContainer,
  ColumContainer,
  Used,
  Text,
  Description,
} from '../../styles/CompanyProfileStyle';
import {
  faMoneyBillAlt,
  faMoneyBill,
  faMicrochip,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../../components/Spinner';
import MappedTable from '../../components/sharedComp/MappedTable';
import Tasks from '../../components/sharedComp/Tasks';

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

  if (loading) return <Spinner loading={loading} size={50} small />;
  else if (error) return <Redirect to="/joboffers" />;
  else
    return (
      <>
        <Main>
          <Title>{data?.specificJobOffer.title}</Title>
          <BasicInfo>
            <IconContainer>
              <Icon icon={faMoneyBillAlt} />
              <Text>
                Minimum salary: <b>{data?.specificJobOffer.minSalary}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faHome} />
              <Text>
                Localisation: <b>{data?.specificJobOffer.localisation}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMoneyBill} />
              <Text>
                Maximum salary: <b>{data?.specificJobOffer.maxSalary}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMicrochip} />
              <Text>
                Main technology: <b>{data?.specificJobOffer.main}</b>
              </Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faMicrochip} />
              <Text>
                Date of publish: <b>{data?.specificJobOffer.date}</b>
              </Text>
            </IconContainer>
          </BasicInfo>
          <Description>
            <h3>Description:</h3>
            {data?.specificJobOffer.description}
          </Description>
          <ColumContainer>
            <Used>Mandatory skills:</Used>
          </ColumContainer>
          <ColumContainer>
            <Used>Extra skills: </Used>
            <MappedTable table={data?.specificJobOffer.extraSkills} />
          </ColumContainer>
          <ColumContainer>
            <Used>Tasks during employment:</Used>
            <Tasks table={data?.specificJobOffer.tasks} />
          </ColumContainer>
          <ColumContainer>
            <Used>Benefits:</Used>
            <MappedTable table={data?.specificJobOffer.benefitsInWork} />
          </ColumContainer>
          <ImagesGallery id={id} />
        </Main>
      </>
    );
};

export default JobDetails;
