import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

const ExtraSkillsInput: React.FC = () => {
  const [extra, setExtra] = useState<string>('');

  return (
    <>
      <InputLabel htmlFor="Extra skills" width={90}>
        Extra skills
      </InputLabel>
      <Input
        name="extraSkills"
        width={90}
        type="text"
        value={extra}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setExtra(e.target.value)
        }
      />
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        Add extra skills
      </Button>
    </>
  );
};

export default ExtraSkillsInput;
