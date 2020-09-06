import React from 'react';
import { parse } from 'query-string';
import { useQuery } from '@apollo/client';
import { GET_SPECIFIC_COMPANY } from '../Graphql/Queries';
import { Redirect } from 'react-router-dom';
import {
  Text,
  Main,
  Title,
  BasicInfo,
  IconContainer,
  Icon,
  Description,
  ColumContainer,
  Used,
  Logo,
} from '../styles/CompanyProfileStyle';
import {
  faFlag,
  faHome,
  faUserFriends,
} from '@fortawesome/free-solid-svg-icons';
import { encode } from 'base64-arraybuffer';
import Spinner from '../components/Spinner';
import MappedTable from '../components/Shared/MappedTable';

const SpecificCompany = () => {
  const id = parse(window.location.search).id;
  const { data, loading, error } = useQuery(GET_SPECIFIC_COMPANY, {
    variables: { id: parseInt(id as any) },
  });

  if (loading) return <Spinner size={50} loading={loading} small />;

  if (error) return <Redirect to="/companies" />;
  return (
    <>
      <Main>
        <Title>
          {data!.getSpecificCompany.company.companyName}
          <Logo
            alt="Company"
            src={`data:image/jpeg;base64, ${encode(
              data.getSpecificCompany.logo.data,
            )}`}
          />
        </Title>
        <BasicInfo>
          <IconContainer>
            <Icon icon={faFlag} />
            <Text>Set in: {data!.getSpecificCompany.company.yearOfSetUp}</Text>
          </IconContainer>
          <IconContainer>
            <Icon icon={faHome} />
            <Text>
              Localisation: {data!.getSpecificCompany.company.localisation}
            </Text>
          </IconContainer>
          <IconContainer>
            <Icon icon={faUserFriends} />
            <Text>
              Size of company: {data!.getSpecificCompany.company.sizeOfCompany}
            </Text>
          </IconContainer>
        </BasicInfo>
        <Description>
          {data!.getSpecificCompany.company.description}
        </Description>
        <ColumContainer>
          <Used>Technologies used:</Used>
          <MappedTable table={data.getSpecificCompany.company.technologies} />
        </ColumContainer>

        <ColumContainer>
          <Used>Benefits in your company:</Used>
          <MappedTable table={data.getSpecificCompany.company.benefits} />
        </ColumContainer>
      </Main>
    </>
  );
};

export default SpecificCompany;
