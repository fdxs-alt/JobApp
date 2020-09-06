import React from 'react';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_COMPANIES } from '../../Graphql/Queries';
import { CompanyWrapper } from '../../styles/CompanyPageStyles';
import Spinner from '../Spinner';
import SingleCompanyCompontent from './SingleCompanyCompontent';

type Props = {
  cursor: number;
};
interface GetAllCompaniesResponse {
  getAllComapanies: [
    {
      id: number;
      name: string;
      data: Buffer;
      type: string;
      company: {
        id: number;
        companyName: string;
        yearOfSetUp: number;
      };
    },
  ];
}
const AllCompanies: React.FC<Props> = ({ cursor }) => {
  const { data, error, loading } = useQuery<GetAllCompaniesResponse>(
    GET_ALL_COMPANIES,
    {
      variables: { cursor },
    },
  );
  console.log(data);
  if (loading) return <Spinner size={50} small loading={loading} />;
  if (error) return <Redirect to="/" />;
  return (
    <CompanyWrapper>
      {data?.getAllComapanies.map((el) => (
        <SingleCompanyCompontent key={el.id} singleCompany={el} />
      ))}
    </CompanyWrapper>
  );
};

export default AllCompanies;
