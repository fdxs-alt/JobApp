import React, { createContext, useReducer, Dispatch } from 'react';
import JobOfferReducer, { Action } from './JobOfferReducer';
export type State = {
  mandatory: string[];
  benefitsInWork: string[];
  extraSkills: string[];
  tasks: string[];
};
const initialState = {
  mandatory: [],
  benefitsInWork: [],
  extraSkills: [],
  tasks: [],
};

const JobOfferContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const JobProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(JobOfferReducer, initialState);
  return (
    <JobOfferContext.Provider value={{ state, dispatch }}>
      {children}
    </JobOfferContext.Provider>
  );
};
export { JobProvider, JobOfferContext };
