import { Action } from '@ngrx/store';
import { AppState } from '../state';
import { Sum } from './sum.model';
import * as SumActions from './sum.actions';

export type Action = SumActions.All;
/**
 * Define all store queries for Post(s)
 */
export namespace SumQuery {
  export const getSum = (state: AppState) => state.sum;
}

/// Default app state
const defaultState: Sum = {
    TM: 0.8,
    WalnutOak: 1.1,
    euro: 1.2,
    ncDiscount: 0.5,
    paint: 1.01,
    usd: 0.8,
    can: 1.01,
    currency: 1.01,
};

/// Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export class StateAction implements Action {
  type: string;
  payload: any;
}

export function sumReducer(state: Sum = defaultState, action: StateAction) {
 // console.log(action.type, state);

  switch (action.type) {

    case SumActions.GET_SUM:
        return newState(state, action.payload );

    case SumActions.GET_SUM_SUCCESS:
        return newState(state, action.payload );

    default:
        return state;
  }
}
