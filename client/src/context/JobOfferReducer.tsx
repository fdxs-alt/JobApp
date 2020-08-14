import {
  ADD_BENEFIT_IN_WORK,
  DELETE_BENEFIT_IN_WORK,
  ADD_SKILL,
  DELETE_SKILL,
  DELETE_MANDATORY,
  ADD_MANDATORY,
  ADD_TASK,
  DELETE_TASK,
  RESET_VALUES,
} from './Types';
import { State } from './JobOfferProvider';

export type Action =
  | { type: 'ADD_BENEFIT_IN_WORK'; payload: string }
  | { type: 'DELETE_BENEFIT_IN_WORK'; payload: string }
  | { type: 'ADD_SKILL'; payload: string }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'ADD_MANDATORY'; payload: string }
  | { type: 'DELETE_MANDATORY'; payload: string }
  | { type: 'ADD_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'RESET_VALUES' };

export default (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_BENEFIT_IN_WORK:
      return {
        ...state,
        benefitsInWork: [action.payload, ...state.benefitsInWork],
      };
    case DELETE_BENEFIT_IN_WORK:
      return {
        ...state,
        benefitsInWork: state.benefitsInWork.filter(
          (b) => b !== action.payload,
        ),
      };
    case ADD_SKILL:
      return {
        ...state,
        extraSkills: [action.payload, ...state.extraSkills],
      };
    case DELETE_SKILL:
      return {
        ...state,
        extraSkills: state.extraSkills.filter((b) => b !== action.payload),
      };
    case ADD_MANDATORY:
      return {
        ...state,
        mandatory: [action.payload, ...state.mandatory],
      };
    case DELETE_MANDATORY:
      return {
        ...state,
        mandatory: state.mandatory.filter((b) => b !== action.payload),
      };
    case ADD_TASK:
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((b) => b !== action.payload),
      };
    case RESET_VALUES:
      return {
        ...state,
        tasks: [],
        mandatory: [],
        extraSkills: [],
        benefitsInWork: [],
      };
    default:
      return { ...state };
  }
};
