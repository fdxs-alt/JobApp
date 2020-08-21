import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_JOB_OFFERS } from '../Graphql/Queries';

type JobQuery = {
  benefitsInWork: string[];
  extraSkills: string[];
  tasks: string[];
  mandatory: string[];
  maxSalary: number;
  minSalary: number;
  onlineRecrutation: boolean;
  title: string;
};
type allUsersOffers = {
  allUsersOffers: JobQuery[];
};
const AllCompanies = () => {
  // const { data, loading } = useQuery<allUsersOffers>(GET_ALL_JOB_OFFERS);
  // console.log(data);
  // if (loading) return null;
  // else
  //   return (
  //     <div>
  //       <h1>Offers:</h1>
  //       {data?.allUsersOffers.map((element) => (
  //         <div>
  //           {element.title} {element.minSalary + `-` + element.maxSalary}
  //         </div>
  //       ))}
  //     </div>
  //   );
  return <div>ss</div>
};

export default AllCompanies;
