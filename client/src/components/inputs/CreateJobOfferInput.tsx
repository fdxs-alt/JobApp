import React, { MouseEvent, ChangeEvent } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

type CreateJobOfferInputProps = {
  name: string;
  value: string;
  handleChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  buttonText: string;
};
const CreateJobOfferInput: React.FC<CreateJobOfferInputProps> = ({
  name,
  value,
  handleChange,
  labelText,
  buttonText,
}) => {
  return (
    <>
      <InputLabel htmlFor={labelText} width={90}>
        {labelText}
      </InputLabel>
      <Input
        name={name}
        width={90}
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default CreateJobOfferInput;
