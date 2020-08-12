import React, { useContext } from 'react';
import { InputLabel } from '../styles/LoginPageStyles';
import { GridWrapper } from '../styles/CreateCompanyStyles';
import { TableContext } from '../context/TableProvider';
import { ADD_TECH } from '../context/Types';
import ToChooseFrom from './ToChooseFrom';

const Benefits = () => {
  const {
    state: { technology },
    dispatch,
  } = useContext(TableContext);

  const handleAddingTech = (tech: string) => {
    dispatch({ type: ADD_TECH, payload: tech });
  };

  if (technology.length === 0) return null;
  else
    return (
      <>
        <InputLabel htmlFor="Technology" width={80}>
          Technology:
        </InputLabel>
        <GridWrapper>
          {technology.map((tech, index) => {
            return (
              <ToChooseFrom
                key={index}
                text={tech}
                handleClick={handleAddingTech}
              />
            );
          })}
        </GridWrapper>
      </>
    );
};

export default Benefits;
