import { Action } from '@ngrx/store';
import { AppState } from '../state';
import { Access } from './access.model';
import * as AccessActions from './access.actions';

export type Action = AccessActions.All;
/**
 * Define all store queries for Post(s)
 */
export namespace AccessQuery {
  export const getAccess = (state: AppState) => state.access;
}

/// Default app state
const defaultState: Access[] = new Array();

/// Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export class StateAction implements Action {
  type: string;
  payload: any;
}

export function accessReducer(state: Access[] = defaultState, action: StateAction) {
 // console.log(action.type, state);

  switch (action.type) {

    case AccessActions.GET_ACCESS:
        return newState(state, action.payload );

    case AccessActions.GET_ACCESS_SUCCESS:
        return newState(state, action.payload );

    default:
        return state;
  }
}
