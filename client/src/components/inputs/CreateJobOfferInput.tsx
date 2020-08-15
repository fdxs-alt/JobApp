import React, { useState, useRef } from 'react';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

type CreateJobOfferInputProps = {
  name: string;
  value: string;
  handleChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (arg: string) => void;
  handleReset: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
  buttonText: string;
};
const CreateJobOfferInput: React.FC<CreateJobOfferInputProps> = ({
  name,
  value,
  handleChange,
  labelText,
  buttonText,
  handleClick,
  handleReset,
}) => {
  const [error, setError] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <InputLabel htmlFor={labelText} width={90}>
        {labelText}
      </InputLabel>
      <Input
        ref={inputRef}
        name={name}
        width={90}
        type="text"
        value={value}
        onFocus={(e: React.ChangeEvent<HTMLInputElement>) => handleReset(e)}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
      />
      <Button
        onClick={(e: any) => {
          e.preventDefault();
          if (value.length === 0) {
            setError("This field can't be empty");
            return;
          }
          handleClick(value);
          inputRef.current?.focus();
          if (error !== null) setError(null);
        }}
        onKeyPress={(e: any) => {
          e.preventDefault();
          if (e.key === 'Enter') {
            if (value.length === 0) {
              setError("This field can't be empty");
              return;
            }
            handleClick(value);
            inputRef.current?.focus();
            if (error !== null) setError(null);
          }
        }}
      >
        {buttonText}
      </Button>
      {error && <Error>{error}</Error>}
    </>
  );
};

export default CreateJobOfferInput;
