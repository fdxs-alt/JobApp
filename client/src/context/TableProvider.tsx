import React, { useReducer, createContext, Dispatch } from 'react';
import { benefits, technologies } from '../HardCoded';
import { State, Action } from './TableReducer';
import TableReducer from './TableReducer';

const initialState = {
  Benefits: benefits,
  technology: technologies,
  userBenefits: [],
  userTechnology: [],
};

const TableContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const TableProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(TableReducer, initialState);

  return (
    <TableContext.Provider value={{ state, dispatch }}>
      {children}
    </TableContext.Provider>
  );
};
export { TableContext, TableProvider };
