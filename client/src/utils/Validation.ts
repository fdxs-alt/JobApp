export type ErrorStateType = {
  type: string;
  message: string;
};

export const validateTable = (
  tasks: string[],
  mandatory: string[],
  extraSkills: string[],
  benefitsInWork: string[],
  setTableErrors: React.Dispatch<React.SetStateAction<ErrorStateType | null>>,
): boolean => {
  if (tasks.length === 0) {
    setTableErrors({
      type: 'tasks.empty',
      message: 'You need to add at least one task',
    });
    return false;
  }
  if (mandatory.length === 0) {
    setTableErrors({
      type: 'mandatory.empty',
      message: 'You need to add at least one mandatory skill',
    });
    return false;
  }
  if (extraSkills.length === 0) {
    setTableErrors({
      type: 'skills.empty',
      message: 'You need to add at least one extra skill',
    });
    return false;
  }
  if (benefitsInWork.length === 0) {
    setTableErrors({
      type: 'benefits.empty',
      message: 'You need to add at least one benefit',
    });
    return false;
  }
  return true;
};
