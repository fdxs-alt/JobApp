import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { useQuery } from '@apollo/client';
import { GET_ALL_CVS } from '../../Graphql/Queries';
import { Container, NoAppsInformation } from '../../styles/CompanyProfileStyle';
const CompanyApplications = () => {
  const { data, loading } = useQuery(GET_ALL_CVS);
  console.log(data);
  if (loading) return null;
  return (
    <>
      <Navbars />
      {/* {data.getAllCvs.length === 0 && (
        <Container>
          <NoAppsInformation>You have got no feedback</NoAppsInformation>
        </Container>
      )} */}
    </>
  );
};

export default CompanyApplications;
