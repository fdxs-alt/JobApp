import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_INFO } from '../Graphql/Queries';

import { Waypoint } from 'react-waypoint';
import { length } from '../Graphql/isAuth';
import {
  Container,
  JobInfromation,
  Column,
  Title,
  LightInfo,
  ColumWithSalary,
  Salary,
} from '../styles/MainPageStyles';
import Spinner from './Spinner';

type infoObjectType = {
  info: [
    {
      id: number;
      title: string;
      minSalary: number;
      maxSalary: number;
      onlineRecrutation: boolean;
      date: string;
      main: string;
      localisation: string;
      company: {
        id: number;
        companyName: string;
      };
    },
  ];
};
type AllInfoQueryType = {
  getAllInfo: infoObjectType;
  hasMore: boolean;
};

let page = 0;
const AllJobOffers = () => {
  const { data, loading, fetchMore } = useQuery<AllInfoQueryType>(
    GET_ALL_INFO,
    {
      variables: { cursor: 0 },
      fetchPolicy: 'network-only',
    },
  );
  const checkIfPossible = (data: any, index: number) => {
    return data.getAllInfo.hasMore && index === data.getAllInfo.info.length - 1;
  };

  if (loading) {
    return <Spinner size={100} loading={loading} />;
  } else
    return (
      <Container>
        {data &&
          data.getAllInfo.info.map((element, index: number) => (
            <React.Fragment key={element.id}>
              <JobInfromation>
                <Column>
                  <Title to={`/specific?id=${element.id}`}>
                    {element.title}
                  </Title>
                  <LightInfo>in {element.company.companyName}</LightInfo>
                  <LightInfo> {element.date}</LightInfo>
                </Column>

                <ColumWithSalary>
                  <Salary>
                    {element.minSalary + ' - ' + element.maxSalary + ' PLN'}
                  </Salary>
                  <Salary>{element.main}</Salary>
                  <LightInfo>{element.localisation}</LightInfo>
                </ColumWithSalary>
              </JobInfromation>
              {checkIfPossible(data, index) ? (
                <Waypoint
                  onEnter={() => {
                    page = data!.getAllInfo.info.length;
                    length(data!.getAllInfo.info.length);
                    fetchMore({
                      variables: { cursor: page },
                    });
                  }}
                />
              ) : null}
            </React.Fragment>
          ))}
      </Container>
    );
};

export default AllJobOffers;
