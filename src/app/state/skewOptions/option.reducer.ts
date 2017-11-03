import { Action } from '@ngrx/store';
import { AppState } from '../state';
import { Option } from './option.model';
import * as OptionActions from './option.actions';

export type Action = OptionActions.All;
/**
 * Define all store queries for Post(s)
 */
export namespace OptionQuery {
  export const getOption = (state: AppState) => state.options;
}

/// Default app state
const defaultState: Option = {
  location: new Array(),
  default: new Array()
};

/// Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export class StateAction implements Action {
  type: string;
  payload: any;
}

export function optionReducer(state: Option = defaultState, action: StateAction) {
 // console.log(action.type, state);

  switch (action.type) {

    case OptionActions.GET_OPTION:
        return newState(state, action.payload );

    case OptionActions.GET_OPTION_SUCCESS:
        return newState(state, action.payload );

    default:
        return state;
  }
}
