import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_COMPANY } from '../../Graphql/Queries';
import {
  faFlag,
  faHome,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import {
  Icon,
  Container,
  CreateLink,
  Main,
  Title,
  BasicInfo,
  IconContainer,
  Description,
  ColumContainer,
  Used,
  GridContainer,
  Element,
  Text,
} from '../../styles/CompanyProfileStyle';
import Logo from '../../components/JobOffer/Logo';
import Spinner from '../../components/Spinner';

type Response = {
  id: number;
  benefits: string[];
  companyName: string;
  description: string;
  yearOfSetUp: number;
  sizeOfCompany: number;
  localisation: string;
  technologies: string[];
};

type getUserCompanyResponse = {
  getUserCompany: Response;
};

const CompanyProfile = () => {
  const { data, loading } = useQuery<getUserCompanyResponse>(GET_USER_COMPANY);
  if (loading) return <Spinner size={50} loading={loading} small />;
  else if (!data!.getUserCompany)
    return (
      <>
        <Container>
          <CreateLink to="/createCompany">
            You dont have company yet, create it now!
          </CreateLink>
        </Container>
      </>
    );
  else
    return (
      <>
        <Main>
          <Title>
            {data!.getUserCompany.companyName}{' '}
            <Logo id={data!.getUserCompany.id} />
          </Title>
          <BasicInfo>
            <IconContainer>
              <Icon icon={faFlag} />
              <Text>Set in: {data!.getUserCompany.yearOfSetUp}</Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faHome} />
              <Text>Localisation: {data!.getUserCompany.localisation}</Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faUserFriends} />
              <Text>Size of company: {data!.getUserCompany.sizeOfCompany}</Text>
            </IconContainer>
          </BasicInfo>
          <Description>{data!.getUserCompany.description}</Description>
          <ColumContainer>
            <Used>Technologies used:</Used>
            <GridContainer>
              {data!.getUserCompany.technologies.map(
                (tech: string, index: number) => (
                  <Element key={index}>{tech}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>

          <ColumContainer>
            <Used>Benefits in your company:</Used>
            <GridContainer>
              {data!.getUserCompany.benefits.map(
                (tech: string, index: number) => (
                  <Element key={index}>{tech}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>
        </Main>
      </>
    );
};

export default CompanyProfile;
