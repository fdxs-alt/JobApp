import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_INFO } from '../Graphql/Queries';
import styled from 'styled-components';
import { toBase64 } from '../utils/ToBase64';
const Container = styled.div`
  width: 80%;
  margin: 2.3rem auto;
`;
const JobInfromation = styled.div`
  width: 100%;
  border-left: 3px solid ${(props) => props.theme.colors.darkish};
  border-top: 2px solid ${(props) => props.theme.colors.border};
  border-bottom: 2px solid ${(props) => props.theme.colors.border};
  padding: 1.2rem 0.8rem;
  display: flex;
`;
const Column = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;
const Title = styled.p`
  font-size: 1.5rem;
  padding: 0.4rem;
`;
const Logo = styled.img`
  width: 50px;
  margin-right: 1rem;
`;
const Salary = styled.div`
  width: 25%;
  text-align: center;
  padding: 0.3rem;
  color: ${(props) => props.theme.colors.fontColor};
  border: 2px solid ${(props) => props.theme.colors.fontColor};
`;
const LightInfo = styled.p`
  color: ${(props) => props.theme.colors.fontColor};
  font-size: 1.4rem;
  padding: 0.5rem;
`;
const ColumWithSalary = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
`;
const AllCompanies = () => {
  const { data, loading } = useQuery(GET_ALL_INFO);
  console.log(data);
  if (loading) return null;
  else
    return (
      <Container>
        {data.getAllInfo.map((element: any) =>
          element.offers.map((offer: any) => (
            <JobInfromation key={offer.id}>
              <Column>
                <Logo
                  src={`data:image/png;base64, ${toBase64(element.logo.data)}`}
                />
                <Title>{offer.title}</Title>
                <LightInfo>in {element.company.companyName}</LightInfo>
              </Column>
              <ColumWithSalary>
                <Salary>
                  {offer.minSalary + ' - ' + offer.maxSalary + ' PLN'}
                </Salary>
                <LightInfo>{element.company.localisation}</LightInfo>
              </ColumWithSalary>
            </JobInfromation>
          )),
        )}
      </Container>
    );
};

export default AllCompanies;
