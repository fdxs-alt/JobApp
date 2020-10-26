import React from 'react';
import {
  JobInfromation,
  Column,
  ColumWithSalary,
  Title,
  LightInfo,
  Salary,
} from '../../styles/MainPageStyles';
type Props = {
  element: {
    id: number;
    title: string;
    minSalary: number;
    maxSalary: number;
    date: string;
    main: string;
    localisation: string;
    company: {
      id: number;
      companyName: string;
    };
  };
};

const JobInformation: React.FC<Props> = ({ element }) => {
  return (
    <JobInfromation>
      <Column>
        <Title to={`/specific?id=${element.id}`}>{element.title}</Title>
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
  );
};

export default JobInformation;
