import React, { useContext } from 'react';
import { InputLabel } from '../styles/LoginPageStyles';
import { GridWrapper } from '../styles/CreateCompanyStyles';
import { TableContext } from '../context/TableProvider';
import { DELETE_TECH } from '../context/Types';
import Users from './Users';

const Benefits = () => {
  const {
    state: { userTechnology },
    dispatch,
  } = useContext(TableContext);

  const handleDeletingTech = (tech: string) => {
    dispatch({ type: DELETE_TECH, payload: tech });
  };

  if (userTechnology.length === 0) return null;
  else
    return (
      <>
        <InputLabel htmlFor="UserBenefits" width={80}>
          Your tech:
        </InputLabel>
        <GridWrapper>
          {userTechnology.map((tech, index) => (
            <Users key={index} text={tech} handleClick={handleDeletingTech} />
          ))}
        </GridWrapper>
      </>
    );
};

export default Benefits;
