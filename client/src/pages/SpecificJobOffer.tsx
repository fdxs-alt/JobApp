import React, { useCallback } from 'react';
import Navbars from '../components/Navbars/Navbars';
import { parse } from 'query-string';
import { useQuery, useMutation } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_SPECIFIC_INFO } from '../Graphql/Queries';
import { encode } from 'base64-arraybuffer';
import {
  faCheckSquare,
  faFlag,
  faUser,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
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
  PaddedDiv,
  Salary,
  StyledParagraph,
  ApplyButton,
  OnlineRecrutationField,
} from '../styles/SpecificJobStyles';
import RandomJobOffers from '../components/RandomJobOffers';
import { useDropzone } from 'react-dropzone';
import { ADD_CV } from '../Graphql/CompanyMutations';
import { ToastContainer } from 'react-toastify';
import isAuthenticated, { isOwner } from '../Graphql/isAuth';
import { CustomToast } from '../utils/CustomToast';

type SpecificInfoType = {
  offer: {
    title: string;
    mandatory: string[];
    extraSkills: string[];
    tasks: string[];
    benefitsInWork: string[];
    minSalary: number;
    maxSalary: number;
    onlineRecrutation: boolean;
    description: string;
    main: string;
    date: string;
    company: {
      companyName: string;
      yearOfSetUp: number;
      sizeOfCompany: number;
      localisation: string;
      description: string;
      technologies: string[];
      benefits: string[];
    };
  };
  logo: {
    type: string;
    data: Buffer;
  };
  images: [
    {
      id: number;
      type: string;
      data: Buffer;
    },
  ];
};
type Response = {
  getSpecificInfo: SpecificInfoType;
};

const SpecificJobOffer = () => {
  const id = parseInt((parse(window.location.search) as any).id);
  const { data, loading, error } = useQuery<Response>(GET_ALL_SPECIFIC_INFO, {
    variables: { id },
  });

  const [addCV] = useMutation(ADD_CV);
  const onDrop = useCallback(
    async ([file]) => {
      if (!isAuthenticated()) {
        return CustomToast('Log in to send CV', 'error');
      }

      if (isOwner()) {
        return CustomToast(
          'Being an owner unables you to send any cv',
          'error',
        );
      }

      const res = await addCV({
        variables: {
          id,
          file,
        },
      });

      (res.data as any).addCv
        ? CustomToast('Cv was sent succesfully', 'success')
        : CustomToast(
            'You have aleady sent your cv, or provided wrong format',
            'error',
          );
    },
    [id],
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    noDrag: true,
    accept: 'application/pdf, application/vnd.ms-excel',
  });

  if (loading) return null;
  else if (error) return <Redirect to="/" />;
  else
    return (
      <>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ width: '30%' }}
        />

        <Navbars />
        {data && (
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
                    Company size:{' '}
                    {data.getSpecificInfo.offer.company.sizeOfCompany}
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
                    <TaskContainer key={index}>
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
                    Company size:{' '}
                    {data.getSpecificInfo.offer.company.sizeOfCompany}
                  </p>
                </ComapnyInfoIconContainer>
                <ComapnyInfoIconContainer>
                  <CompanyInfoIcon icon={faHome} />
                  <p style={{ padding: '0.8rem' }}>
                    {' '}
                    Main location:{' '}
                    {data.getSpecificInfo.offer.company.localisation}
                  </p>
                </ComapnyInfoIconContainer>

                <Description>
                  {data.getSpecificInfo.offer.company.description}
                </Description>
              </AboutCompanyContainer>
              <div style={{ padding: '1.5rem' }}>
                <Label>See us working!</Label>
                {(data.getSpecificInfo.images.length as number) !== 0 ? (
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
              <OnlineRecrutationField>
                Online recruitment
              </OnlineRecrutationField>
              <PaddedDiv>
                <Salary>
                  {' '}
                  {data.getSpecificInfo.offer.minSalary +
                    ' - ' +
                    data.getSpecificInfo.offer.maxSalary}{' '}
                  PLN
                </Salary>
                <StyledParagraph>+vat per month</StyledParagraph>
              </PaddedDiv>
              <PaddedDiv>
                <StyledParagraph>
                  Possible job locations:{' '}
                  {data.getSpecificInfo.offer.company.localisation}
                </StyledParagraph>

                <ApplyButton {...getRootProps()} tabIndex={0}>
                  <input {...getInputProps()} />
                  Apply
                </ApplyButton>
              </PaddedDiv>
            </SecondaryColumn>
          </Container>
        )}
      </>
    );
};

export default SpecificJobOffer;
