import React, { useContext } from 'react';
import { InputLabel } from '../styles/LoginPageStyles';
import { GridWrapper } from '../styles/CreateCompanyStyles';
import { TableContext } from '../context/TableProvider';
import ToChooseFrom from './ToChooseFrom';
import { ADD_BENEFIT } from '../context/Types';
const Benefits = () => {
  const {
    state: { Benefits },
    dispatch,
  } = useContext(TableContext);

  const handleAddingBenefit = (benefit: string) => {
    dispatch({ type: ADD_BENEFIT, payload: benefit });
  };

  if (Benefits.length === 0) return null;
  else
    return (
      <>
        <InputLabel htmlFor="Benefits" width={80}>
          Benefits:
        </InputLabel>
        <GridWrapper>
          {Benefits.map((benefit, index) => {
            return (
              <ToChooseFrom
                key={index}
                text={benefit}
                handleClick={handleAddingBenefit}
              />
            );
          })}
        </GridWrapper>
      </>
    );
};

export default Benefits;
