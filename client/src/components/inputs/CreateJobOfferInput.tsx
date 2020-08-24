import React, { useState, useRef } from 'react';
import { InputLabel, Error } from '../../styles/LoginPageStyles';
import { Input, AddButton } from '../../styles/CreateCompanyStyles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
type CreateJobOfferInputProps = {
  name: string;
  value: string;
  handleChange: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  handleClick: (arg: string) => void;
  handleReset: (arg: React.ChangeEvent<HTMLInputElement>) => void;
  labelText: string;
};
const CreateJobOfferInput: React.FC<CreateJobOfferInputProps> = ({
  name,
  value,
  handleChange,
  labelText,
  handleClick,
  handleReset,
}) => {
  const [error, setError] = useState<null | string>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      style={{
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <InputLabel htmlFor={labelText} width={90}>
        {labelText}
      </InputLabel>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Input
          ref={inputRef}
          name={name}
          width={70}
          type="text"
          value={value}
          onFocus={(e: React.ChangeEvent<HTMLInputElement>) => handleReset(e)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)}
        />
        <AddButton
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
          ADD <FontAwesomeIcon icon={faPlus} />
        </AddButton>
        {error && <Error>{error}</Error>}
      </div>
    </form>
  );
};

export default CreateJobOfferInput;
