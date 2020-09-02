import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_COMPANIES } from '../Graphql/Queries';
import { encode } from 'base64-arraybuffer';
import {
  CompanyWrapper,
  SingleComapny,
  CompanyName,
  Logo,
  CompanyLink,
} from '../styles/CompanyPageStyles';

type Props = {
  cursor: number;
};
const AllCompanies: React.FC<Props> = ({ cursor }) => {
  const { data, error, loading } = useQuery(GET_ALL_COMPANIES, {
    variables: { cursor },
  });

  if (loading) return null;
  if (error) return <Redirect to="/" />;
  return (
    <CompanyWrapper>
      {data.getAllComapanies.map((el: any) => (
        <SingleComapny key={el.company.id}>
          {el.data && (
            <Logo
              alt="Company"
              src={`data:image/jpeg;base64, ${encode(el.data)}`}
            />
          )}
          <CompanyName>
            <p>{el.company.companyName}</p>
            <CompanyLink to={`/company?id=${el.company.id}`}>
              More info...
            </CompanyLink>
          </CompanyName>
        </SingleComapny>
      ))}
    </CompanyWrapper>
  );
};

export default AllCompanies;
