import React, { useContext } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { GridWrapper } from '../../styles/CreateCompanyStyles';
import { TableContext } from '../../context/TableProvider';
import { DELETE_BENEFIT } from '../../context/Types';
import Users from './Users';
const Benefits = () => {
  const {
    state: { userBenefits },
    dispatch,
  } = useContext(TableContext);

  const handleDeletingBenefit = (benefit: string) => {
    dispatch({ type: DELETE_BENEFIT, payload: benefit });
  };

  if (userBenefits.length === 0) return null;
  else
    return (
      <>
        <InputLabel htmlFor="UserBenefits" width={80}>
          Your benefits:
        </InputLabel>
        <GridWrapper>
          {userBenefits.map((benefit, index) => (
            <Users
              key={index}
              text={benefit}
              handleClick={handleDeletingBenefit}
            />
          ))}
        </GridWrapper>
      </>
    );
};

export default Benefits;
