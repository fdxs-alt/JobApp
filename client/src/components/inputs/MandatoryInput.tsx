import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

const MandatoryInput: React.FC = () => {
  const [mandatory, setMandatory] = useState<string>('');
  return (
    <>
      <InputLabel htmlFor="Mandatory skills" width={90}>
        Mandatory skills
      </InputLabel>
      <Input
        name="mandatory"
        width={90}
        type="text"
        value={mandatory}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setMandatory(e.target.value)
        }
      />
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        Add mandatory skill
      </Button>
    </>
  );
};

export default MandatoryInput;
