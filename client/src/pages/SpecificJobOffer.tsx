import React from 'react';
import Navbars from '../components/Navbars/Navbars';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_SPECIFIC_INFO } from '../Graphql/Queries';
import { encode } from 'base64-arraybuffer';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';
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
} from '../styles/SpecificJobStyles';

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
          <div style={{ padding: '1rem' }}>
            <Label>Benefits</Label>
            <BenefitGrid>
              {data.getSpecificInfo.offer.benefitsInWork.map(
                (element: string, index: number) => (
                  <IconContainer>
                    <Icon icon={faCheckSquare} />
                    <p style={{ padding: '0.8rem' }}>{element}</p>
                  </IconContainer>
                ),
              )}
            </BenefitGrid>
          </div>
        </MainSectionColumn>

        <SecondaryColumn></SecondaryColumn>
      </Container>
    </>
  );
};

export default SpecificJobOffer;
