import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_SPECIFIC_INFO } from '../Graphql/Queries';
import { encode } from 'base64-arraybuffer';
import {
  faCheckSquare,
  faFlag,
  faUser,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  MainSectionColumn,
  TitleWithLogo,
  InfoSection,
  Info,
  Label,
  SkillsContainer,
  ExtraSkillsGrid,
  DailyTasks,
  TaskContainer,
  Circle,
  Task,
  BenefitGrid,
  SecondaryColumn,
  Title,
  Container,
  Description,
  Element,
  GridContainer,
  Icon,
  IconContainer,
  Logo,
  AboutCompanyContainer,
  ComapnyInfoIconContainer,
  CompanyInfoIcon,
  Image,
} from '../styles/SpecificJobStyles';
import styled from 'styled-components';
import RandomJobOffers from '../components/RandomJobOffers';

export const OnlineRecrutationField = styled.div`
  width: 100%;
  padding: 1.5rem;
`;
const SpecificJobOffer = () => {
  const id = parseInt((parse(window.location.search) as any).id);
  const { data, loading, error } = useQuery(GET_ALL_SPECIFIC_INFO, {
    variables: { id },
  });
  console.log(data);
  if (loading) return null;
  else if (error) return <Redirect to="/" />;
  return (
    <>
      <Navbars />
      <Container>
        <MainSectionColumn>
          <TitleWithLogo>
            {data.getSpecificInfo.logo.type === 'image/png' ? (
              <Logo
                alt="Job offer"
                src={`data:image/png;base64, ${encode(
                  data.getSpecificInfo.logo.data,
                )}`}
              />
            ) : (
              <Logo
                alt="Job offer"
                src={`data:image/jpeg;base64, ${encode(
                  data.getSpecificInfo.logo.data,
                )}`}
              />
            )}

            <InfoSection>
              <Title>{data.getSpecificInfo.offer.title}</Title>
              <Info>
                Company: {data.getSpecificInfo.offer.company.companyName}
              </Info>
              <Info>
                Company size: {data.getSpecificInfo.offer.company.sizeOfCompany}
              </Info>
            </InfoSection>
          </TitleWithLogo>
          <Description>
            <Label>Brief job description</Label>
            {data.getSpecificInfo.offer.description}
          </Description>
          <SkillsContainer>
            <Label>Must have</Label>
            <GridContainer>
              {data.getSpecificInfo.offer.mandatory.map(
                (element: string, index: number) => (
                  <Element key={index}>{element}</Element>
                ),
              )}
            </GridContainer>
            <Label>Nice to have</Label>
            <ExtraSkillsGrid>
              {data.getSpecificInfo.offer.extraSkills.map(
                (element: string, index: number) => (
                  <Element key={index}>{element}</Element>
                ),
              )}
            </ExtraSkillsGrid>
          </SkillsContainer>

          <DailyTasks>
            <Label>Your daily tasks on the job</Label>
            {data.getSpecificInfo.offer.tasks.map(
              (element: string, index: number) => (
                <TaskContainer>
                  <Circle>{index + 1}</Circle>
                  <Task>{element}</Task>
                </TaskContainer>
              ),
            )}
          </DailyTasks>
          <div style={{ padding: '1.5rem' }}>
            <Label>Benefits</Label>
            <BenefitGrid>
              {data.getSpecificInfo.offer.benefitsInWork.map(
                (element: string, index: number) => (
                  <IconContainer key={index}>
                    <Icon icon={faCheckSquare} />
                    <p style={{ padding: '0.8rem' }}>{element}</p>
                  </IconContainer>
                ),
              )}
            </BenefitGrid>
          </div>

          <AboutCompanyContainer>
            <Label>About Company</Label>
            <ComapnyInfoIconContainer>
              <CompanyInfoIcon icon={faFlag} />
              <p style={{ padding: '0.8rem' }}>
                {' '}
                Founded in: {data.getSpecificInfo.offer.company.yearOfSetUp}
              </p>
            </ComapnyInfoIconContainer>
            <ComapnyInfoIconContainer>
              <CompanyInfoIcon icon={faUser} />
              <p style={{ padding: '0.8rem' }}>
                {' '}
                Company size: {data.getSpecificInfo.offer.company.sizeOfCompany}
              </p>
            </ComapnyInfoIconContainer>
            <ComapnyInfoIconContainer>
              <CompanyInfoIcon icon={faHome} />
              <p style={{ padding: '0.8rem' }}>
                {' '}
                Main location: {data.getSpecificInfo.offer.company.localisation}
              </p>
            </ComapnyInfoIconContainer>

            <Description>
              {data.getSpecificInfo.offer.company.description}
            </Description>
          </AboutCompanyContainer>
          <div style={{ padding: '1.5rem' }}>
            <Label>See us working!</Label>
            {data.getSpecificInfo.images.length !== 0 ? (
              <BenefitGrid>
                {data.getSpecificInfo.images.map(
                  (image: any, index: number) => (
                    <Image
                      key={index}
                      alt="Job offer"
                      src={`data:image/png;base64, ${encode(image.data)}`}
                    />
                  ),
                )}
              </BenefitGrid>
            ) : null}
          </div>
          <Label>SEE ALSO SIMILAR ADS!</Label>
          <RandomJobOffers />
        </MainSectionColumn>
        <SecondaryColumn>
          <OnlineRecrutationField>Online recruitment</OnlineRecrutationField>
        </SecondaryColumn>
      </Container>
    </>
  );
};

export default SpecificJobOffer;
