import React from 'react';
import {
  SingleComapny,
  Logo,
  CompanyName,
  CompanyLink,
} from '../../styles/CompanyPageStyles';
import { encode } from 'base64-arraybuffer';
interface Props {
  singleCompany: {
    id: number;
    name: string;
    data: Buffer;
    type: string;
    company: {
      id: number;
      companyName: string;
      yearOfSetUp: number;
    };
  };
}
const SingleCompanyCompontent: React.FC<Props> = ({ singleCompany }) => {
  return (
    <SingleComapny key={singleCompany.id}>
      {singleCompany.data && (
        <Logo
          alt="Company"
          src={`data:image/jpeg;base64, ${encode(singleCompany.data)}`}
        />
      )}
      <CompanyName>
        <p>{singleCompany.company.companyName}</p>
        <CompanyLink to={`/company?id=${singleCompany.company.id}`}>
          More info...
        </CompanyLink>
      </CompanyName>
    </SingleComapny>
  );
};

export default SingleCompanyCompontent;
