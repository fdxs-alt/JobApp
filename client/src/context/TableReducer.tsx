import { ADD_BENEFIT, DELETE_BENEFIT, ADD_TECH, DELETE_TECH } from './Types';

export type Action =
  | { type: 'ADD_BENEFIT'; payload: string }
  | { type: 'DELETE_BENEFIT'; payload: string }
  | { type: 'ADD_TECH'; payload: string }
  | { type: 'DELETE_TECH'; payload: string };
export type State = {
  Benefits: string[];
  technology: string[];
  userBenefits: string[];
  userTechnology: string[];
};
export default (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_BENEFIT:
      return {
        ...state,
        Benefits: state.Benefits.filter((b) => b !== action.payload),
        userBenefits: [action.payload, ...state.userBenefits],
      };
    case DELETE_BENEFIT:
      return {
        ...state,
        Benefits: [...state.Benefits, action.payload],
        userBenefits: state.userBenefits.filter((b) => b !== action.payload),
      };
    case ADD_TECH:
      return {
        ...state,
        technology: state.technology.filter((b) => b !== action.payload),
        userTechnology: [action.payload, ...state.userTechnology],
      };
    case DELETE_TECH:
      return {
        ...state,
        technology: [...state.technology, action.payload],
        userTechnology: state.userTechnology.filter(
          (b) => b !== action.payload,
        ),
      };
    default:
      return { ...state };
  }
};
