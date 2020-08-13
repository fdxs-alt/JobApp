import React, { useState, MouseEvent, ChangeEvent } from 'react';
import { InputLabel } from '../../styles/LoginPageStyles';
import { Input, Button } from '../../styles/CreateCompanyStyles';

const TasksInput: React.FC = () => {
  const [task, setTask] = useState<string>('');
  return (
    <>
      <InputLabel htmlFor="Tasks" width={90}>
        Tasks
      </InputLabel>
      <Input
        name="tasks"
        width={90}
        type="text"
        value={task}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTask(e.target.value)
        }
      />
      <Button
        onClick={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        Add task
      </Button>
    </>
  );
};

export default TasksInput;
