import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
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

const CompanyProfile = () => {
  const { data, loading } = useQuery(GET_USER_COMPANY);
  console.log(data);
  if (loading) return null;
  else if (!data.getUserCompany)
    return (
      <>
        <Navbars />
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
        <Navbars />
        <Main>
          <Title>{data.getUserCompany.companyName}</Title>
          <BasicInfo>
            <IconContainer>
              <Icon icon={faFlag} />
              <Text>Set in: {data.getUserCompany.yearOfSetUp}</Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faHome} />
              <Text>Localisation: {data.getUserCompany.localisation}</Text>
            </IconContainer>
            <IconContainer>
              <Icon icon={faUserFriends} />
              <Text>Size of company: {data.getUserCompany.sizeOfCompany}</Text>
            </IconContainer>
          </BasicInfo>
          <Description>{data.getUserCompany.description}</Description>
          <ColumContainer>
            <Used>Technologies used:</Used>
            <GridContainer>
              {data.getUserCompany.technologies.map(
                (tech: string, index: number) => (
                  <Element key={index}>{tech}</Element>
                ),
              )}
            </GridContainer>
          </ColumContainer>

          <ColumContainer>
            <Used>Benefits in your company:</Used>
            <GridContainer>
              {data.getUserCompany.benefits.map(
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
