import { Action } from '@ngrx/store';
import * as SkuActions from './sku.actions';
import { Sku } from './sku.model';
import { AppState } from '../state';

export type Action = SkuActions.All;
/**
 * Define all store queries for Post(s)
 */
export namespace SkuQuery {
  export const getSku = (state: AppState) => state.sku;
}

/// Default app state
const defaultState: Sku = {
    cabinet: null,
    material: null,
    counter: null,
    counterColor: null,
    pantry: null,
    accessories: null,
};

/// Helper function to create new state object
const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export class StateAction implements Action {
  type: string;
  payload: any;
}

export function skuReducer(state: Sku = defaultState, action: StateAction) {
 // console.log(action.type, state);

  switch (action.type) {

    case SkuActions.ADDCABINET:
        return newState(state, {
            cabinet: action.payload,
            material: null,
            counter: null,
            counterColor: null,
            pantry: null,
            accessories: new Array()
        });

    case SkuActions.ADDMATERIAL:
        return newState(state, { material: action.payload });

    case SkuActions.ADDCOUNTER:
        return newState(state, { counter: action.payload });

    case SkuActions.ADDCOUNTERCOLOR:
        return newState(state, { counterColor: action.payload });

    case SkuActions.ADDPANTRY:
        return newState(state, { pantry: action.payload });

    case SkuActions.ADDACCESSORY:
        return newState(state, { accessories: action.payload });

    case SkuActions.REMOVEACCESSORY:
        return newState(state, { accessories: action.payload });

    case SkuActions.RESET:
        return newState(state, defaultState);

    default:
        return state;
    }

}
