import { Action } from '@ngrx/store';
import { Counter } from './counters.model';

export const GET_COUNTERS           = 'Counters get';
export const GET_COUNTERS_SUCCESS   = 'Counters get success';

export const RESET             = 'Counters Reset';

export class GetCounters implements Action {
  readonly type = GET_COUNTERS;
  constructor(public payload?: any) {}
}

export class GetCountersSuccess implements Action {
  readonly type = GET_COUNTERS_SUCCESS;
  constructor(public payload: Counter) {}
}

export class Reset implements Action {
    readonly type = RESET;
  }
  export type All
= GetCounters
| GetCountersSuccess;
