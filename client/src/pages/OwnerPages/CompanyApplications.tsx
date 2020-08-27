import React from 'react';
import Navbars from '../../components/Navbars/Navbars';
import { useQuery } from '@apollo/client';
import { GET_ALL_CVS } from '../../Graphql/Queries';
import { Container, NoAppsInformation } from '../../styles/CompanyProfileStyle';
import { Link } from 'react-router-dom';
const CompanyApplications = () => {
  const { data, loading } = useQuery(GET_ALL_CVS);
  console.log(data);
  if (loading) return null;
  return (
    <>
      <Navbars />
      <div>
        {data.getAllCvs.map((element: any) =>
          element.cvs.map((cv: any) => (
            <a href={`http://localhost:5000/cv/${cv.name}`}>Click to see</a>
          )),
        )}
      </div>
    </>
  );
};

export default CompanyApplications;
