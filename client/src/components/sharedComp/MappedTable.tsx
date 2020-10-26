import React from 'react';
import { GridContainer, Element } from '../../styles/CompanyProfileStyle';

interface Props {
  table: string[] | undefined;
}
const MappedTable: React.FC<Props> = ({ table }) => {
  return (
    <GridContainer>
      {table?.map((element: string, index: number) => (
        <Element key={index}>{element}</Element>
      ))}
    </GridContainer>
  );
};

export default MappedTable;
