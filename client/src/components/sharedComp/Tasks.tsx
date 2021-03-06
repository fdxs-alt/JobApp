import React from 'react';
import {
  DailyTasks,
  TaskContainer,
  Circle,
  Task,
} from '../../styles/SpecificJobStyles';

interface Props {
  table: string[] | undefined;
}
const Tasks: React.FC<Props> = ({ table }) => {
  return (
    <DailyTasks>
      {table
        ? table.map((task: string, index: number) => (
            <TaskContainer key={index}>
              <Circle>{index + 1}</Circle>
              <Task>{task}</Task>
            </TaskContainer>
          ))
        : null}
    </DailyTasks>
  );
};

export default Tasks;
