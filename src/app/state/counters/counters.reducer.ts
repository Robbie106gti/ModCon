import { Action } from '@ngrx/store';
import { AppState } from '../state';
import { Counter } from './counters.model';
import * as CountersActions from './counters.actions';

export type Action = CountersActions.All;
/**
 * Define all store queries for Post(s)
 */
export namespace CountersQuery {
  export const getCounters = (state: AppState) => state.counters;
}

/// Default app state
const defaultState: Counter[] = new Array();

/// Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export class StateAction implements Action {
  type: string;
  payload: any;
}

export function countersReducer(state: Counter[] = defaultState, action: StateAction) {
 // console.log(action.type, state);

  switch (action.type) {

    case CountersActions.GET_COUNTERS:
        return newState(state, action.payload );

    case CountersActions.GET_COUNTERS_SUCCESS:
        return newState(state, action.payload );

    default:
        return state;
  }
}
