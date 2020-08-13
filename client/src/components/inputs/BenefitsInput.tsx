import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

const TasksInput: React.FC = () => {
  const [benefit, setBenefit] = useState<string>('');

  return (
    <>
      <InputLabel htmlFor="Benefits in work" width={90}>
        Benefits in work
      </InputLabel>
      <Input
        name="benefitsInWork"
        width={90}
        type="text"
        value={benefit}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setBenefit(e.target.value)
        }
      />
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        Add benefit
      </Button>
    </>
  );
};

export default TasksInput;
