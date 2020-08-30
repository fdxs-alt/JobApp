import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { GET_ALL_COMPANIES } from '../Graphql/Queries';
import { encode } from 'base64-arraybuffer';

const CompanyWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 0.4rem;
  gap: 2rem;
`;
const SingleComapny = styled.div`
  display: flex;
  padding: 0.4rem;
  border: 2px solid ${(props) => props.theme.colors.lighterBorder};
  &:hover {
    border: 2px solid ${(props) => props.theme.colors.darkish};
  }
`;
const Logo = styled.img`
  width: 25%;
`;
const CompanyName = styled.p`
  flex: 75%;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkish};
  font-weight: 500;
  padding: 0.4rem;
  overflow: hidden;
  justify-self: center;
`;
type Props = {
  cursor: number;
};
const AllCompanies: React.FC<Props> = ({ cursor }) => {
  const { data, error, loading } = useQuery(GET_ALL_COMPANIES, {
    variables: { cursor },
  });
  console.log(data);
  if (loading) return null;
  if (error) return <Redirect to="/" />;
  return (
    <CompanyWrapper>
      {data.getAllComapanies.map((el: any) => (
        <SingleComapny key={el.id}>
          {el.data && (
            <Logo
              alt="Company"
              src={`data:image/png;base64, ${encode(el.data)}`}
            />
          )}
          <CompanyName>{el.company.companyName}</CompanyName>
        </SingleComapny>
      ))}
    </CompanyWrapper>
  );
};

export default AllCompanies;
